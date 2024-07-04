import 'dotenv/config';

const config = {
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	user: process.env.DATABASE_USER || 'root',
	password: '' || process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
};
export default config;
