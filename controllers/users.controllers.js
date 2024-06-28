import UsersDaoMemory from '../db/daos/users.dao.memory.js';
import UsersDaoMysql from '../db/daos/users.dao.mysql.js';
import UsersHelpers from '../helpers/users.helpers.js';

export default class UsersControllers {
	constructor() {
		if (process.argv[2] === 'dev') {
			console.log('modo dev (DaoMemory)');
			this.db = new UsersDaoMemory();
		}
		if (process.argv[2] === 'prod') {
			console.log('modo prod (DaoMysql)');
			this.db = new UsersDaoMysql();
		}
		this.helpers = new UsersHelpers();
	}

	getAllUsers = async (req, res) => {
		const users = await this.db.getAllUsers();
		res.json(users);
	};

	getUserById = async (req, res) => {
		const { id } = req.params;
		const user = await this.db.getUserById(id);
		res.json(user ? user : { user: null });
	};

	getUserByName = async (req, res) => {
		const { name } = req.query;
		const result = await this.db.getUserByName(name);
		res.json(result ? result : { user: null });
	};

	createUser = async (req, res) => {
		const user = this.helpers.parseUsers(req.body);
		const result = await this.db.createUser(user);
		res.json(result);
	};

	updateUser = async (req, res) => {
		const user = this.helpers.parseUsers(req.body);
		const result = await this.db.updateUser(user);
		res.json(result);
	};

	deleteUser = async (req, res) => {
		const { id } = req.params;
		const result = await this.db.deleteUser(id);
		res.json(result);
	};
}
