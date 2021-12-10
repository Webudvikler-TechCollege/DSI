import db from '../Config/db.config.js';

class SongModel {
	constructor() {
		console.log('Class song model is loaded');

	}

	list = (req, res) => {
		return new Promise((resolve, reject) => {
			const orderKey = req.query.orderBy || 'id';
			let sql = `SELECT * FROM song ORDER BY ${orderKey}`;
			db.query(sql, (err, result) => {
				if(err) {
					reject(err);
				} else {
					resolve(result);
				}
			})
		})
	}

	get = (req, res) => {
		return new Promise((resolve, reject) => {
			const sql = `SELECT id, title, content, artist_id 
							FROM song 
							WHERE id = ?`;
			db.query(sql, [req.params.id], (err, result) => {
				if(err) {
					reject(err)
				} else {
					resolve(...result)
				}
			})
		})
	}
}

export default SongModel;