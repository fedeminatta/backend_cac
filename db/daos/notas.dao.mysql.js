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
		const query = `CREATE TABLE IF NOT EXISTS ?? (
            id INT PRIMARY KEY,
            texto VARCHAR(100) NOT NULL,
            usuario VARCHAR(100) NOT NULL
        )`;
		this.connection.query(query, [this.table]);
	}

	async getAllNotas() {
		const query = `SELECT * FROM ??`;
		const [result] = await this.connection.promise().query(query, [this.table]);
		console.log(result);
		return result;
	}

	async getNotaById(id) {
		const query = `SELECT * FROM ?? WHERE id = ?`;
		const [result] = await this.connection
			.promise()
			.query(query, [this.table, id]);
		console.log(result);
		return result;
	}

	async getNotaByTexto(texto) {
		const query = `SELECT * FROM ?? WHERE texto LIKE ?`;
		const [result] = await this.connection
			.promise()
			.query(query, [this.table, `%${texto}%`]);
		console.log(result);
		return result;
	}

	async getNotaByUsuario(usuario) {
		const query = `SELECT * FROM ?? WHERE usuario = ?`;
		const [result] = await this.connection
			.promise()
			.query(query, [this.table, `${usuario}`]); // es necesario usar `` ya que usuario es un string
		console.log(result);
		return result;
	}

	async createNota(nota) {
		const { id, texto, usuario } = nota;
		const query = `INSERT INTO ?? VALUES(?,?,?)`;
		const [result] = await this.connection
			.promise()
			.query(query, [thiss.table, id, texto, usuario]);

		if (result.affectedRows > 0) {
			return { message: 'Nota creada correctamente' };
		} else {
			return { message: 'Nota no creada' };
		}
	}

	async updateNota(nota) {
		const { id, texto } = nota;
		const query = `UPDATE ?? SET texto = ? WHERE id = ?`;
		const [result] = await this.connection
			.promise()
			.query(query, [this.table, texto, id]);
		if (result.affectedRows > 0) {
			return { message: 'Nota modificada correctamente' };
		} else {
			return { message: 'Nota no modificada' };
		}
	}

	async deleteNota(id) {
		const query = `DELETE FROM ?? WHERE id = ?`;
		const [result] = await this.connection
			.promise()
			.query(query, [this.table, id]);
		if (result.affectedRows > 0) {
			return { message: 'Nota eliminada correctamente' };
		} else {
			return { message: 'Nota no eliminada' };
		}
	}
}
