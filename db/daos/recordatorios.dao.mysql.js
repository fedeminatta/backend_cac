/* 
    DAO significa Data Access Object es donde voy a guardar la logica
    para que el controller solo haga las consultas y respuestas
*/

import Mysql from '../connections/Mysql.js';

export default class RecordatoriosDaoMysql extends Mysql {
	constructor() {
		super();
		this.table = 'recordatorios';
		this.#createTable();
	}

	#createTable() {
		const query = `CREATE TABLE IF NOT EXISTS ?? (
            id INT PRIMARY KEY,
            recordatorio VARCHAR(100) NOT NULL,
            fecha VARCHAR(100) NOT NULL,
            usuario VARCHAR(100) NOT NULL
        )`;
		this.connection.query(query, [this.table]);
	}

	async getAllRecordatorios() {
		const query = `SELECT * FROM ??`;
		const [result] = await this.connection.promise().query(query, [this.table]);
		console.log(result);
		return result;
	}
	async getRecordatoriosByUsuario(usuario) {
		const query = `SELECT * FROM ?? WHERE usuario = ?`;
		const [result] = await this.connection
			.promise()
			.query(query, [this.table, `${usuario}`]); // es necesario usar `` ya que usuario es un string
		console.log(result);
		return result;
	}

	async createRecordatorio(data) {
		const { id, recordatorio, fecha, usuario } = data;
		const query = `INSERT INTO ?? VALUES(?,?,?,?)`;
		const [result] = await this.connection
			.promise()
			.query(query, [this.table, id, recordatorio, fecha, usuario]);

		if (result.affectedRows > 0) {
			return { message: 'Recordatorio creado correctamente' };
		} else {
			return { message: 'Recordatorio no creado' };
		}
	}

	async updateRecordatorio(data) {
		const { id, recordatorio, fecha } = data;
		const query = `UPDATE ?? SET recordatorio = ? , fecha = ? WHERE id = ?`;
		const [result] = await this.connection
			.promise()
			.query(query, [this.table, recordatorio, fecha, id]);
		if (result.affectedRows > 0) {
			return { message: 'Recordatorio modificado correctamente' };
		} else {
			return { message: 'Recordatorio no modificado' };
		}
	}

	async deleteRecordatorio(id) {
		const query = `DELETE FROM ?? WHERE id = ?`;
		const [result] = await this.connection
			.promise()
			.query(query, [this.table, id]);
		if (result.affectedRows > 0) {
			return { message: 'Recordatorio eliminado correctamente' };
		} else {
			return { message: 'Recordatorio no eliminado' };
		}
	}
}
