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
		const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
            id INT PRIMARY KEY,
            texto VARCHAR(100) NOT NULL,
            completada BOOLEAN NOT NULL DEFAULT FALSE,
            usuario VARCHAR(100) NOT NULL
        )`;
		this.connection.query(query);
	}

	async getAllTareas() {
		const query = `SELECT * FROM ${this.table}`;
		const [result] = await this.connection.promise().query(query);
		console.log(result);
		return result;
	}

	async getTareaById(id) {
		const query = `SELECT * FROM ${this.table} WHERE id = ${id}`;
		const [result] = await this.connection.promise().query(query);
		console.log(result);
		return result;
	}

	async getTareaByTexto(texto) {
		const query = `SELECT * FROM ${this.table} WHERE texto = '${texto}'`;
		const [result] = await this.connection.promise().query(query);
		console.log(result);
		return result;
	}

	async getTareaByUsuario(usuario) {
		const query = `SELECT * FROM ${this.table} WHERE usuario = '${usuario}'`;
		const [result] = await this.connection.promise().query(query);
		console.log(result);
		return result;
	}

	async createTarea(tarea) {
		const { id, texto, completada, usuario } = tarea;
		const query = `INSERT INTO ${this.table} VALUES(?,?,?,?)`;
		const [result] = await this.connection
			.promise()
			.query(query, [id, texto, completada, usuario]);

		if (result.affectedRows > 0) {
			return { message: 'Tarea creada correctamente' };
		} else {
			return { message: 'Tarea no creada' };
		}
	}

	async updateTarea(tarea) {
		const { id, texto, completada } = tarea;
		const query = `UPDATE ${this.table} SET completada = ?, texto = ? WHERE id = ?`;
		const [result] = await this.connection
			.promise()
			.query(query, [completada, texto, id]);
		if (result.affectedRows > 0) {
			return { message: 'Tarea modificada correctamente' };
		} else {
			return { message: 'Tarea no modificada' };
		}
	}

	async deleteTarea(id) {
		const query = `DELETE FROM ${this.table} WHERE id = ${id}`;
		const [result] = await this.connection.promise().query(query);
		if (result.affectedRows > 0) {
			return { message: 'Tarea eliminada correctamente' };
		} else {
			return { message: 'Tarea no eliminada' };
		}
	}
}
