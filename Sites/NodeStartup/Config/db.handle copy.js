import pool from './db.mysql2.js'

const db = {}

db.query = (sql, values = null) => {
	return new Promise((resolve, reject) => {
		pool.query(sql, values, (err, result) => {
			if (err) {
				reject(new Error())
			} else {
				resolve(result)
			}
		})
	})
}

export default db;