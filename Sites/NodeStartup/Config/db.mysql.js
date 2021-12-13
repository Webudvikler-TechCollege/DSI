import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
	connectionLimit: 10,
	password: process.env.DB_PASSWORD,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT
})

connection.connect((err) => {
	if(err) {
		throw err;
	}
	console.log('MySQL Connected');
});

export default connection;