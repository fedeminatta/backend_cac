import Nota from '../models/Nota.js';

export default class NotasHelpers {
	parseNotas(data, create) {
		const { id, texto, usuario } = data;
		const nota = new Nota(
			create ? parseInt(id + Math.random() * 231) : parseInt(id),
			texto,
			usuario
		);
		return nota;
	}
}
