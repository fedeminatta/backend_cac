import NotasDaoMemory from '../db/daos/notas.dao.memory.js';
import NotasDaoMysql from '../db/daos/notas.dao.mysql.js';
import NotasHelpers from '../helpers/notas.helpers.js';

export default class NotasControllers {
	constructor() {
		if (process.argv[2] === 'dev') {
			console.log('modo dev (DaoMemory)');
			this.db = new NotasDaoMemory();
		}
		if (process.argv[2] === 'prod') {
			console.log('modo prod (DaoMysql)');
			this.db = new NotasDaoMysql();
		}
		this.helpers = new NotasHelpers();
	}

	getAllNotas = async (req, res) => {
		const notas = await this.db.getAllNotas();
		res.json(notas);
	};

	getNotaById = async (req, res) => {
		const { id } = req.params;
		const nota = await this.db.getNotaById(id);
		res.json(nota ? nota : { nota: null });
	};

	getNotaByTexto = async (req, res) => {
		const { texto } = req.query;
		const result = await this.db.getNotaByTexto(texto);
		res.json(result ? result : { nota: null });
	};

	getNotaByUsuario = async (req, res) => {
		const { usuario } = req.query;
		const result = await this.db.getNotaByUsuario(usuario);
		res.json(result ? result : { nota: null });
	};

	createNota = async (req, res) => {
		const nota = this.helpers.parseNotas(req.body, true);
		const result = await this.db.createNota(nota);
		res.json(result);
	};

	updateNota = async (req, res) => {
		const nota = this.helpers.parseNotas(req.body);
		const result = await this.db.updateNota(nota);
		res.json(result);
	};

	deleteNota = async (req, res) => {
		const { id } = req.params;
		const result = await this.db.deleteNota(id);
		res.json(result);
	};
}
