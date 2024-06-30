import tareasMock from '../mocks/tareas.mock.js';

/* 
    DAO significa Data Access Object es donde voy a guardar la logica
    para que el controller solo haga las consultas y respuestas
*/

export default class TareasDaoMemory {
	constructor() {
		this.tareas = tareasMock;
	}

	getAllTareas() {
		return this.tareas;
	}

	getTareaById(id) {
		const tarea = this.tareas.find((tarea) => tarea.id === parseInt(id));
		return tarea;
	}

	getTareaByTexto(texto) {
		const result = this.tareas.filter((tarea) =>
			tarea.texto.toLowerCase().includes(texto.toLowerCase())
		);
		return result;
	}
	getTareaByUsuario(usuario) {
		const result = this.tareas.filter(
			(tarea) => tarea.usuario.toLowerCase() === usuario.toLowerCase()
		);
		return result;
	}

	createTarea(tarea) {
		this.tareas.push(tarea);
		return true;
	}

	updateTarea(data) {
		let modTarea = null;
		this.tareas = this.tareas.map((tarea) => {
			if (tarea.id === data.id) {
				tarea = data;
				modTarea = tarea;
			}
			return tarea;
		});
		return modTarea;
	}

	deleteTarea(id) {
		let oldLength = this.tareas.length;
		this.tareas = this.tareas.filter((tarea) => tarea.id !== parseInt(id));
		return oldLength !== this.tareas.length;
	}
}
