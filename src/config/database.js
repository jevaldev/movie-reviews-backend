import mysql from 'mysql2/promise'
import 'dotenv/config'

export const dbConnection = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  port: process.env.DB_PORT || 3306,
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'reviews_db'
})
