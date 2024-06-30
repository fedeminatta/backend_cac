import notasMock from '../mocks/notas.mock.js';

/* 
    DAO significa Data Access Object es donde voy a guardar la logica
    para que el controller solo haga las consultas y respuestas
*/

export default class NotasDaoMemory {
	constructor() {
		this.notas = notasMock;
	}

	getAllNotas() {
		return this.notas;
	}

	getNotaById(id) {
		const nota = this.notas.find((nota) => nota.id === parseInt(id));
		return nota;
	}

	getNotaByTexto(texto) {
		const result = this.notas.filter(
			(nota) => nota.texto.toLowerCase() === texto.toLowerCase()
		);
		return result;
	}
	getNotaByUsuario(usuario) {
		const result = this.notas.filter(
			(nota) => nota.usuario.toLowerCase() === usuario.toLowerCase()
		);
		return result;
	}

	createNota(nota) {
		this.notas.push(nota);
		return true;
	}

	updateNota(data) {
		let modNota = null;
		this.notas = this.notas.map((nota) => {
			if (nota.id === data.id) {
				nota = data;
				modNota = nota;
			}
			return nota;
		});
		return modNota;
	}

	deleteNota(id) {
		let oldLength = this.notas.length;
		this.notas = this.notas.filter((nota) => nota.id !== parseInt(id));
		return oldLength !== this.notas.length;
	}
}
