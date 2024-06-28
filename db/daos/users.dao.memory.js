import usersMock from '../mocks/users.mock.js';

/* 
    DAO significa Data Access Object es donde voy a guardar la logica
    para que el controller solo haga las consultas y respuestas
*/

export default class UsersDaoMemory {
	constructor() {
		this.users = usersMock;
	}

	getAllUsers() {
		return this.users;
	}

	getUserById(id) {
		const user = this.users.find((user) => user.id === parseInt(id));
		return user;
	}

	getUserByName(name) {
		const result = this.users.filter(
			(user) => user.name.toLowerCase() === name.toLowerCase()
		);
		return result;
	}

	createUser(user) {
		this.users.push(user);
		return true;
	}

	updateUser(data) {
		let modUser = null;
		this.users = this.users.map((user) => {
			if (user.id === data.id) {
				user = data;
				modUser = user;
			}
			return user;
		});
		return modUser;
	}

	deleteUser(id) {
		let oldLength = this.users.length;
		this.users = this.users.filter((user) => user.id !== parseInt(id));
		return oldLength !== this.users.length;
	}
}
