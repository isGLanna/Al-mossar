import { config } from 'dotenv'
import { Pool, PoolClient } from 'pg'

config()

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

export function query(text: string, params?: any[]) {
  return pool.query(text, params)
}

export async function sql(strings: TemplateStringsArray, ...values: any[]) {
  let text = ''
  for (let i = 0; i < values.length; i++) {
    text += `${strings.raw[i]}$${i + 1}`
  }
  text += strings.raw[values.length]
  return query(text, values)
}

export async function transaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await fn(client)
    await client.query('COMMIT')
    return result
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

export function close() {
  return pool.end()
}
