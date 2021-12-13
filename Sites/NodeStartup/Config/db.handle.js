import pool from './db.mysql2.js'
import dotenv from 'dotenv'

class Db {
	constructor() {
		this.createPool();
	}

	createPool = () => {
		const pool = mysql.createPool({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			database: process.env.DB_NAME,
			password: process.env.DB_PASSWORD,
			port: process.env.DB_PORT,
			waitForConnections: true,
			connectionLimit: 10,
			queueLimit: 0
		})
	}
}

export default Db;