import Routes from './Routes.js';
import UsersControllers from '../controllers/users.controllers.js';

export default class UsersRoutes extends Routes {
	constructor() {
		super();
		this.controller = new UsersControllers();
		this.getRoutes();
	}

	getRoutes() {
		this.router
			.get('/', this.controller.getAllUsers)
			.get('/user', this.controller.getUserByName)
			.get('/:id', this.controller.getUserById)
			.post('/', this.controller.createUser)
			.put('/', this.controller.updateUser)
			.delete('/:id', this.controller.deleteUser);
	}
}
