import Routes from './Routes.js';
import NotasControllers from '../controllers/notas.controllers.js';

export default class NotasRoutes extends Routes {
	constructor() {
		super();
		this.controller = new NotasControllers();
		this.getRoutes();
	}

	getRoutes() {
		this.router
			.get('/', this.controller.getAllNotas)
			.get('/nota', this.controller.getNotaByTexto)
			.get('/usuario', this.controller.getNotaByUsuario)
			.get('/:id', this.controller.getNotaById)
			.post('/', this.controller.createNota)
			.put('/', this.controller.updateNota)
			.delete('/:id', this.controller.deleteNota);
	}
}
