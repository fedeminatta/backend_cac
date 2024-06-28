import 'dotenv/config';

const config = {
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	user: 'root',
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
};
export default config;
