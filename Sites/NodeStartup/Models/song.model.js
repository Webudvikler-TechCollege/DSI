import db from '../Config/db.handle.js';
class SongModel {
	constructor() {
		console.log('SongModel is running');
	}

	list = async (req, res) => {
		const orderby = req.query.orderby || 's.id';
		const dir = req.query.dir || 'ASC';
		const limit = req.query.limit ? ` LIMIT ${req.query.limit}` : '';
		const sql = `SELECT s.id, s.title, a.name as artist, s.created 
						FROM song s 
						JOIN artist a 
						ON s.artist_id = a.id 
						ORDER BY ${orderby} ${dir}${limit}`;
		return db.query(sql)
			.then(result => {
				return result;
			})
			.catch(err => {
				return ({ status: false, error: err })
			})
	}

	get = async (req, res) => {
		const values = [req.params.id]
		const sql = `SELECT s.id, s.title, s.content, s.artist_id, 
						a.name AS artist, s.created 
						FROM song s 
						JOIN artist a 
						ON s.artist_id = a.id 
						WHERE s.id = ?`;
		return db.query(sql, values)
			.then(result => {
				const [obj] = result;
				return obj;
			})
			.catch(err => {
				return ({ status: false, error: err })
			})
	}

	create = async (req, res) => {
		const values = Object.values(req.body);
		const sql = `INSERT INTO song(title, content, artist_id) 
						VALUES(?, ?, ?)`;
		return db.query(sql, values)
			.then(result => {
				return ({ status: true, id: result.insertId })
			})
			.catch(err => {
				return ({ status: false, error: err })
			})
	}

	update = async (req, res) => {
		const values = Object.values(req.body);
		const sql = `UPDATE song 
						SET title = ?, content = ?, artist_id = ? 
						yWHERE id = ?`;
		return db.query(sql, values)
			.then(result => {
				return { status: true, id: req.body.id };
			})
			.catch(err => {
				return { status: false, error: err };
			})
	}

	delete = async (req, res) => {
		const values = [req.params.id]
		const sql = `DELETE FROM song WHERE id = ?`;
		return db.query(sql, values)
			.then(result => {
				return { status: true }
			})
			.catch(err => {
				return { status: false, error: err }
			})
	}
}

export { SongModel }