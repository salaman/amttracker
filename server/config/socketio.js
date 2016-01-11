import { railyard } from '../config/amt';

function onDisconnect(socket) { }

function onConnect(socket) {
	// When the client emits 'info', this listens and executes
	socket.on('info', data => {
		socket.log(JSON.stringify(data, null, 2));
	});

	for (var id in railyard.trains) {
		socket.emit('vehiclePosition', railyard.trains[id]);
	}

	// Insert sockets below
	socket.emit('test', { hello: 'world' });
}

export default function (io) {

	io.on('connection', socket => {
		socket.address = socket.request.connection.remoteAddress + ':' + socket.request.connection.remotePort;
		socket.connectedAt = new Date();

		socket.log = function (...data) {
			console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
		};

		// Call onDisconnect.
		socket.on('disconnect', () => {
			onDisconnect(socket);
			socket.log('DISCONNECTED');
		});

		// Call onConnect.
		onConnect(socket);
		socket.log('CONNECTED');
	});

};
