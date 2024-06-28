import mysql from 'mysql2';
import config from '../config/mysql.config.js';

export default class Mysql {
	constructor() {
		this.connection = mysql.createConnection(config);
		this.connection.connect((err) =>
			err
				? console.error('No se pudo conectar a la DB')
				: console.log('DB conectada')
		);
	}
}
