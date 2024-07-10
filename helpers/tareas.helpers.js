import Tarea from '../models/Tarea.js';

export default class TareasHelpers {
	parseTareas(data, create) {
		const { id, texto, completada, usuario } = data;
		let completadaBool = completada === 'true';
		const tarea = new Tarea(
			create ? parseInt(id + Math.random() * 231) : parseInt(id),
			texto,
			completadaBool,
			usuario
		);
		return tarea;
	}
}
