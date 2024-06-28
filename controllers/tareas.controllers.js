import TareasDaoMemory from '../db/daos/tareas.dao.memory.js';
import TareasDaoMysql from '../db/daos/tareas.dao.mysql.js';
import TareasHelpers from '../helpers/tareas.helpers.js';

export default class TareasControllers {
	constructor() {
		if (process.argv[2] === 'dev') {
			console.log('modo dev (DaoMemory)');
			this.db = new TareasDaoMemory();
		}
		if (process.argv[2] === 'prod') {
			console.log('modo prod (DaoMysql)');
			this.db = new TareasDaoMysql();
		}
		this.helpers = new TareasHelpers();
	}

	getAllTareas = async (req, res) => {
		const tareas = await this.db.getAllTareas();
		res.json(tareas);
	};

	getTareaById = async (req, res) => {
		const { id } = req.params;
		const tarea = await this.db.getTareaById(id);
		res.json(tarea ? tarea : { tarea: null });
	};

	getTareaByTexto = async (req, res) => {
		const { texto } = req.query;
		const result = await this.db.getTareaByTexto(texto);
		res.json(result ? result : { tarea: null });
	};

	getTareaByUsuario = async (req, res) => {
		const { usuario } = req.query;
		const result = await this.db.getTareaByUsuario(usuario);
		res.json(result ? result : { tarea: null });
	};

	createTarea = async (req, res) => {
		const tarea = this.helpers.parseTareas(req.body);
		const result = await this.db.createTarea(tarea);
		res.json(result);
	};

	updateTarea = async (req, res) => {
		const tarea = this.helpers.parseTareas(req.body);
		const result = await this.db.updateTarea(tarea);
		res.json(result);
	};

	deleteTarea = async (req, res) => {
		const { id } = req.params;
		const result = await this.db.deleteTarea(id);
		res.json(result);
	};
}
