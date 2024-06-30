/* 
    DAO significa Data Access Object es donde voy a guardar la logica
    para que el controller solo haga las consultas y respuestas
*/

import Mysql from '../connections/Mysql.js';

export default class TareasDaoMysql extends Mysql {
	constructor() {
		super();
		this.table = 'tareas';
		this.#createTable();
	}

	#createTable() {
		const query = `CREATE TABLE IF NOT EXISTS ?? (
            id INT PRIMARY KEY,
            texto VARCHAR(100) NOT NULL,
            completada BOOLEAN NOT NULL DEFAULT FALSE,
            usuario VARCHAR(100) NOT NULL
        )`;
		this.connection.query(query, [this.table]);
	}

	async getAllTareas() {
		const query = `SELECT * FROM ??`;
		const [result] = await this.connection.promise().query(query, [this.table]);
		console.log(result);
		return result;
	}

	async getTareaById(id) {
		const query = `SELECT * FROM ?? WHERE id = ?`;
		const [result] = await this.connection
			.promise()
			.query(query, [this.table, id]);
		console.log(result);
		return result;
	}

	async getTareaByTexto(texto) {
		const query = `SELECT * FROM ?? WHERE texto LIKE ?`;
		const [result] = await this.connection
			.promise()
			.query(query, [this.table, `%${texto}%`]);
		console.log(result);
		return result;
	}

	async getTareaByUsuario(usuario) {
		const query = `SELECT * FROM ?? WHERE usuario = ?`;
		const [result] = await this.connection
			.promise()
			.query(query, [this.table, `${usuario}`]); // es necesario usar `` ya que usuario es un string
		console.log(result);
		return result;
	}

	async createTarea(tarea) {
		const { id, texto, completada, usuario } = tarea;
		const query = `INSERT INTO ?? VALUES(?,?,?,?)`;
		const [result] = await this.connection
			.promise()
			.query(query, [this.table, id, texto, completada, usuario]);

		if (result.affectedRows > 0) {
			return { message: 'Tarea creada correctamente' };
		} else {
			return { message: 'Tarea no creada' };
		}
	}

	async updateTarea(tarea) {
		const { id, texto, completada } = tarea;
		const query = `UPDATE ?? SET completada = ?, texto = ? WHERE id = ?`;
		const [result] = await this.connection
			.promise()
			.query(query, [this.table, completada, texto, id]);
		if (result.affectedRows > 0) {
			return { message: 'Tarea modificada correctamente' };
		} else {
			return { message: 'Tarea no modificada' };
		}
	}

	async deleteTarea(id) {
		const query = `DELETE FROM ?? WHERE id = ?`;
		const [result] = await this.connection
			.promise()
			.query(query, [this.table, id]);
		if (result.affectedRows > 0) {
			return { message: 'Tarea eliminada correctamente' };
		} else {
			return { message: 'Tarea no eliminada' };
		}
	}
}
