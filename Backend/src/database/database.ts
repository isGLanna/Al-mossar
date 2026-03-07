import { Pool } from 'pg'
import 'dotenv/config'

const client = new Pool({
  connectionString: process.env.POSTGRES_URL
});

export default client
