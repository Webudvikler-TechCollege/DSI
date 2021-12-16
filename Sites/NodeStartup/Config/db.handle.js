import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

/*
DB pool, en "mass connection" med de indstillinger vi 
ville bruge under normale db opkoblings forhold.
*/
const db = mysql
	.createPool({
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		port: process.env.DB_PORT,
		waitForConnections: true,
		connectionLimit: 10,
	}).promise();