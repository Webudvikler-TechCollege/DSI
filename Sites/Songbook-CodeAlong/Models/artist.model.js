import db from '../Config/db.config.js'

class ArtistModel {
	constructor() {
		console.log('Call to ArtistModel');
	}

	list = (req, res) => {
		return new Promise((resolve, reject) => {
			const sql = `SELECT id, name 
							FROM artist`
			db.query(sql, (err, result) => {
				if(err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	}
}

export default ArtistModel