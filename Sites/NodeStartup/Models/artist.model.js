import Db from '../Config/db.handle.js'
const db = new Db();

console.log(db.pool);
class ArtistModel {
	constructor() {
	}

	list = () => {
		const sql = 'SELECT * FROM song';
		console.log(db.query(sql));
	}

}

export default ArtistModel;