import RecordatoriosDaoMemory from '../db/daos/recordatorios.dao.memory.js';
import RecordatoriosDaoMysql from '../db/daos/recordatorios.dao.mysql.js';
import RecordatoriosHelpers from '../helpers/recordatorios.helpers.js';

export default class NotasControllers {
	constructor() {
		if (process.argv[2] === 'dev') {
			console.log('modo dev (DaoMemory)');
			this.db = new RecordatoriosDaoMemory();
		}
		if (process.argv[2] === 'prod') {
			console.log('modo prod (DaoMysql)');
			this.db = new RecordatoriosDaoMysql();
		}
		this.helpers = new RecordatoriosHelpers();
	}

	getAllRecordatorios = async (req, res) => {
		const recordatorios = await this.db.getAllRecordatorios();
		res.json(recordatorios);
	};

	getRecordatoriosByUsuario = async (req, res) => {
		const { usuario } = req.query;
		const result = await this.db.getRecordatoriosByUsuario(usuario);
		res.json(result ? result : { recordatorios: null });
	};

	createRecordatorio = async (req, res) => {
		const recordatorio = this.helpers.parseRecordatorios(req.body, true);
		const result = await this.db.createRecordatorio(recordatorio);
		res.json(result);
	};

	updateRecordatorio = async (req, res) => {
		const recordatorio = this.helpers.parseRecordatorios(req.body);
		const result = await this.db.updateRecordatorio(recordatorio);
		res.json(result);
	};

	deleteRecordatorio = async (req, res) => {
		const { id } = req.params;
		const result = await this.db.deleteRecordatorio(id);
		res.json(result);
	};
}
