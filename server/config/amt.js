import { assign } from 'lodash/object';
import Railyard from '../amt/railyard';

var railyard = new Railyard();

export { railyard };

export default function (io, client) {

	client.connected(line => {
		console.log('[Connected] (' + line + ')');
	});

	client.disconnected(line => {
		console.log('[Disconnected] (' + line + ')');
	});

	client.vehiclePosition((line, data) => {
		io.emit('vehiclePosition', assign(data, {
			line
		}));

		railyard.onPositionUpdate(line, data);

		console.log('[VehiclePosition] (' + line + ')"', JSON.stringify(data));
	});

	client.start([1, 2, 3, 4, 5, 6]);

}
