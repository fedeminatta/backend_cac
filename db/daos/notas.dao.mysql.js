/* 
    DAO significa Data Access Object es donde voy a guardar la logica
    para que el controller solo haga las consultas y respuestas
*/

import Mysql from '../connections/Mysql.js';

export default class NotasDaoMysql extends Mysql {
	constructor() {
		super();
		this.table = 'notas';
		this.#createTable();
	}

	#createTable() {
		const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
            id INT PRIMARY KEY,
            texto VARCHAR(100) NOT NULL,
            usuario VARCHAR(100) NOT NULL
        )`;
		this.connection.query(query);
	}

	async getAllNotas() {
		const query = `SELECT * FROM ${this.table}`;
		const [result] = await this.connection.promise().query(query);
		console.log(result);
		return result;
	}

	async getNotaById(id) {
		const query = `SELECT * FROM ${this.table} WHERE id = ${id}`;
		const [result] = await this.connection.promise().query(query);
		console.log(result);
		return result;
	}

	async getNotaByTexto(texto) {
		const query = `SELECT * FROM ${this.table} WHERE texto = '${texto}'`;
		const [result] = await this.connection.promise().query(query);
		console.log(result);
		return result;
	}

	async getNotaByUsuario(usuario) {
		const query = `SELECT * FROM ${this.table} WHERE usuario = '${usuario}'`;
		const [result] = await this.connection.promise().query(query);
		console.log(result);
		return result;
	}

	async createNota(nota) {
		const { id, texto, usuario } = nota;
		const query = `INSERT INTO ${this.table} VALUES(?,?,?)`;
		const [result] = await this.connection
			.promise()
			.query(query, [id, texto, usuario]);

		if (result.affectedRows > 0) {
			return { message: 'Nota creada correctamente' };
		} else {
			return { message: 'Nota no creada' };
		}
	}

	async updateNota(nota) {
		const { id, texto, completada } = nota;
		const query = `UPDATE ${this.table} SET texto = ? WHERE id = ?`;
		const [result] = await this.connection.promise().query(query, [texto, id]);
		if (result.affectedRows > 0) {
			return { message: 'Nota modificada correctamente' };
		} else {
			return { message: 'Nota no modificada' };
		}
	}

	async deleteNota(id) {
		const query = `DELETE FROM ${this.table} WHERE id = ${id}`;
		const [result] = await this.connection.promise().query(query);
		if (result.affectedRows > 0) {
			return { message: 'Nota eliminada correctamente' };
		} else {
			return { message: 'Nota no eliminada' };
		}
	}
}
