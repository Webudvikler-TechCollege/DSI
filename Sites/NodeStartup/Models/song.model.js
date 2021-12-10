import db from '../Config/db.config.js';

class SongModel {
	constructor() {
		console.log('SongModel is running');
	}

	list = (req, res) => {
		return new Promise((resolve, reject) => {
			const sql = "SELECT * FROM song";
			db.query(sql, (err, result) => {
				if(err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
	
		})
	}

	get = (req, res) => {
		return new Promise((resolve, reject) => {
			const sql = `SELECT * 
							FROM song 
							WHERE id = ?`;
			db.query(sql, [req.params.id], (err, result) => {
				if(err) {
					reject(err)
				} else {
					resolve(result)
				}
			}) 
		})
	}

	create = (req, res) => {
		const { title, content, artist_id } = req.body;
		if(title && content && artist_id) {
			return `Opret sang med ${title}, ${content}, ${artist_id}`;
		}
	}

	update = (req, res) => {
		const { title, content, id } = req.body;
		if(title && content && id) {
			return `Opdater sang nr. ${id} med ${title}, ${content}`;
		}
	}

	delete = (req, res) => {
		return `Sletter sang nr. ${req.params.id}`;
	}
}

export { SongModel }