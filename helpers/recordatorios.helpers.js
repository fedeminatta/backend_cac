import Recordatorio from '../models/Recordatorio.js';

export default class RecordatorioHelpers {
	parseRecordatorios(data, create) {
		const { id, recordatorio, fecha, usuario } = data;
		const result = new Recordatorio(
			create ? parseInt(id + Math.random() * 231) : parseInt(id),
			recordatorio,
			fecha,
			usuario
		);
		return result;
	}
}
