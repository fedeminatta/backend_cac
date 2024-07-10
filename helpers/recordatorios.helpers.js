import Recordatorio from '../models/Recordatorio.js';

export default class RecordatorioHelpers {
	parseRecordatorios(data) {
		const { id, recordatorio, fecha, usuario } = data;
		const result = new Recordatorio(
			parseInt(id + Math.random() * 231),
			recordatorio,
			fecha,
			usuario
		);
		return result;
	}
}
