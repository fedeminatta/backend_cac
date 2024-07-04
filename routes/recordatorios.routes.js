import Routes from './Routes.js';
import RecordatoriosControllers from '../controllers/recordatorios.controllers.js';

export default class RecordatoriosRoutes extends Routes {
	constructor() {
		super();
		this.controller = new RecordatoriosControllers();
		this.getRoutes();
	}

	getRoutes() {
		this.router
			.get('/', this.controller.getAllRecordatorios)
			.get('/usuario', this.controller.getRecordatoriosByUsuario)
			.post('/', this.controller.createRecordatorio)
			.put('/', this.controller.updateRecordatorio)
			.delete('/:id', this.controller.deleteRecordatorio);
	}
}
