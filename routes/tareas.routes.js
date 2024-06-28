import Routes from './Routes.js';
import TareasControllers from '../controllers/tareas.controllers.js';

export default class TareasRoutes extends Routes {
	constructor() {
		super();
		this.controller = new TareasControllers();
		this.getRoutes();
	}

	getRoutes() {
		this.router
			.get('/', this.controller.getAllTareas)
			.get('/tarea', this.controller.getTareaByTexto)
			.get('/usuario', this.controller.getTareaByUsuario)
			.get('/:id', this.controller.getTareaById)
			.post('/', this.controller.createTarea)
			.put('/', this.controller.updateTarea)
			.delete('/:id', this.controller.deleteTarea);
	}
}
