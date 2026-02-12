import { config } from 'dotenv'
config()

import { readdir, readFile } from 'node:fs/promises'
import { close, sql, transaction } from './db'

type Migration = {
  name: string
  content: string
}

const migrationNames = (await readdir('database/migrations'))
  .sort((a, b) => a.localeCompare(b))

await sql`
  CREATE TABLE IF NOT EXISTS _migrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    rolled_back_at TIMESTAMPTZ
  );
`

const migrations = await Promise.all(migrationNames.map(async (name): Promise<Migration> => ({
  name: name,
  content: await readFile(`database/migrations/${name}/up.sql`, 'utf-8')
})))

await transaction(async (client) => {
  const { rows } = await client.query<{ name: string }>(`
    SELECT DISTINCT name
    FROM _migrations
    WHERE rolled_back_at IS NULL
  `)

  const applied = new Set(rows.map(row => row.name))

  const pendingMigrations = migrations.filter(migrations => !applied.has(migrations.name))

  console.log(`Found ${pendingMigrations.length} pending migrations.`)

  for (const migration of pendingMigrations) {
    console.log(`Applying migration: ${migration.name}`)
    try {
      await client.query(migration.content)
    } catch(error) {
      console.error(`Failed to apply migration: ${migration.name}`)
      console.error('Rolling back all migrations...')
      throw error
    }
    await client.query(`
      INSERT INTO _migrations (name)
      VALUES ($1)
    `, [migration.name])
  }
})

close()
