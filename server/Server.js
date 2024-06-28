import express from 'express';
import UsersRoutes from '../routes/users.routes.js';
import TareasRoutes from '../routes/tareas.routes.js';

export default class Server {
	static app = express();

	static middlewares() {
		Server.app.use(express.json());
		Server.app.use(express.urlencoded({ extended: true }));
	}

	static routes() {
		const users = new UsersRoutes();
		const tareas = new TareasRoutes();
		Server.app.use('/users', users.router);
		Server.app.use('/tareas', tareas.router);
	}

	static runServer(port) {
		Server.app.listen(port, () =>
			console.log(`escuchando en el puerto ${port}`)
		);
	}

	static run(port) {
		console.clear();
		Server.middlewares();
		Server.routes();
		Server.runServer(port);
	}
}
