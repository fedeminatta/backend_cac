import Nota from '../models/Nota.js';

export default class NotasHelpers {
	parseNotas(data) {
		const { id, texto, usuario } = data;
		const nota = new Nota(parseInt(id + Math.random() * 231), texto, usuario);
		return nota;
	}
}
