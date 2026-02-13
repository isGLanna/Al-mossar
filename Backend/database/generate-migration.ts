import { mkdir, writeFile } from 'node:fs/promises'

const now = new Date()

const year = now.getFullYear()
const month = String(now.getMonth() + 1).padStart(2, '0')
const day = String(now.getDate()).padStart(2, '0')

const hour = now.getHours()
const minute = now.getMinutes()
const second = now.getSeconds()

const digest = String((hour * 60 + minute) * 60 * second).padStart(5, '0')

const dir_name = `database/migrations/${year}-${month}-${day}-${digest}-migration`

await mkdir(dir_name)
await Promise.all([
  writeFile(`${dir_name}/up.sql`, `-- Migration generated on ${year}-${month}-${day} ${hour}:${minute}:${second}\n\n-- Write your SQL migration here\n`),
  writeFile(`${dir_name}/down.sql`, `-- Migration generated on ${year}-${month}-${day} ${hour}:${minute}:${second}\n\n-- Write your SQL rollback here\n`),
])
