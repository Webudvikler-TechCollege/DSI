import db from '../Config/mysql.config.js'

class SongController {
	constructor() {
		console.log('Class SongController instantiated');
	}

	list = (req, res) => {
		const sql = `SELECT s.id, s.title, a.name, a.id AS artist_id
						FROM song s 
						JOIN artist a 
						ON s.artist_id = a.id 
						ORDER BY a.name`
		db.query(sql, (err, result) => {
			if(err) {
				console.error(err)
			} else {
				res.json(result)
			}
		})
	}

	details = (req, res) => {
		const id = parseInt(req.params.id)
		const sql = `SELECT s.id, s.title, s.content, a.name 
						FROM song s 
						JOIN artist a 
						ON s.artist_id = a.id 
						WHERE s.id = ? 
						ORDER BY a.name`
		db.query(sql, [id], (err, result) => {
			if(err) {
				console.error(err)
			} else {
				res.json(result)
			}
		})
	}

	create = (req, res) => {
		const { title, content, artist_id } = req.body
		//console.log({title, content, artist_id});

		if(title && content && artist_id) {
			const sql = `
				INSERT INTO song(title, content, artist_id) 
				VALUES(?,?,?)				
			`
			db.query(sql, [title, content, artist_id], (err, result) => {
				if(err) {
					console.error(err)
				} else {
					res.json({new_id: result.insertId})
				}
			})
		}

	}
	// create

	// update

	// delete
}

export default SongController