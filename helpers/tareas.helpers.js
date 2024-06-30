import Tarea from '../models/Tarea.js';

export default class TareasHelpers {
	parseTareas(data) {
		const { id, texto, completada, usuario } = data;
		let completadaBool = completada === 'true';
		const tarea = new Tarea(parseInt(id), texto, completadaBool, usuario);
		return tarea;
	}
}
