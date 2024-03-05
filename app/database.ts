import { Pool } from 'pg'
import "dotenv/config"

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSW
})

export default pool