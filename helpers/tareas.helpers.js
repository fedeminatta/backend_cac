import Tarea from '../models/Tarea.js';

export default class TareasHelpers {
	parseUsers(data) {
		const { id, texto, completado, usuario } = data;
		let completadoBool = completado === 'true';
		const tarea = new Tarea(parseInt(id), texto, completadoBool, usuario);
		return tarea;
	}
}
