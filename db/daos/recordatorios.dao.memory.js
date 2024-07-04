import recordatoriosMock from '../mocks/recordatorios.mock.js';

/* 
    DAO significa Data Access Object es donde voy a guardar la logica
    para que el controller solo haga las consultas y respuestas
*/

export default class RecordatoriosDaoMemory {
	constructor() {
		this.recordatorios = recordatoriosMock;
	}

	getAllRecordatorios() {
		return this.recordatorios;
	}

	getRecordatoriosByUsuario(usuario) {
		const result = this.recordatorios.filter(
			(recordatorio) =>
				recordatorio.usuario.toLowerCase() === usuario.toLowerCase()
		);
		return result;
	}

	createRecordatorio(recordatorio) {
		this.recordatorios.push(recordatorio);
		return true;
	}

	updateRecordatorio(data) {
		let modRecordatorio = null;
		this.recordatorios = this.recordatorios.map((recordatorio) => {
			if (recordatorio.id === data.id) {
				recordatorio = data;
				modRecordatorio = recordatorio;
			}
			return recordatorio;
		});
		return modRecordatorio;
	}

	deleteRecordatorio(id) {
		let oldLength = this.recordatorios.length;
		this.recordatorios = this.recordatorios.filter(
			(recordatorio) => recordatorio.id !== parseInt(id)
		);
		return oldLength !== this.recordatorios.length;
	}
}
