/* 
    DAO significa Data Access Object es donde voy a guardar la logica
    para que el controller solo haga las consultas y respuestas
*/

import Mysql from '../connections/Mysql.js';

export default class UsersDaoMysql extends Mysql {
	constructor() {
		super();
		this.table = 'usuarios';
		this.#createTable();
	}

	#createTable() {
		const query = `CREATE TABLE IF NOT EXISTS ${this.table} (
            id INT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            age INT NOT NULL
        )`;
		this.connection.query(query);
	}

	async getAllUsers() {
		const query = `SELECT * FROM ${this.table}`;
		const [result] = await this.connection.promise().query(query);
		console.log(result);
		return result;
	}

	async getUserById(id) {
		const query = `SELECT * FROM ${this.table} WHERE id = ${id}`;
		const [result] = await this.connection.promise().query(query);
		console.log(result);
		return result;
	}

	async getUserByName(name) {
		const query = `SELECT * FROM ${this.table} WHERE name = '${name}'`;
		const [result] = await this.connection.promise().query(query);
		console.log(result);
		return result;
	}

	async createUser(user) {
		const { id, name, age } = user;
		const query = `INSERT INTO ${this.table} VALUES(?,?,?)`;
		const [result] = await this.connection
			.promise()
			.query(query, [id, name, age]);

		if (result.affectedRows > 0) {
			return { message: 'Usuario creado correctamente' };
		} else {
			return { message: 'Usuario no creado' };
		}
	}

	async updateUser(user) {
		const { id, name, age } = user;
		const query = `UPDATE ${this.table} SET name = ?, age = ? WHERE id = ?`;
		const [result] = await this.connection
			.promise()
			.query(query, [name, age, id]);
		if (result.affectedRows > 0) {
			return { message: 'Usuario modificado correctamente' };
		} else {
			return { message: 'Usario no modificado' };
		}
	}

	async deleteUser(id) {
		const query = `DELETE FROM ${this.table} WHERE id = ${id}`;
		const [result] = await this.connection.promise().query(query);
		if (result.affectedRows > 0) {
			return { message: 'Usuario eliminado correctamente' };
		} else {
			return { message: 'Usario no eliminado' };
		}
	}
}
