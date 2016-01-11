import { load, loaded, Map, Marker, Polyline } from 'vue-google-maps';
import io from 'socket.io-client';

/*global google*/

export default {

	data() {
		return {
			center: {lat: 45.5696718, lng: -73.6547436},
			zoom: 11,
			markers: [],
			polylines: [],
			lines: null,
			trains: {}
		};
	},

	components: {
		Map,
		Marker,
		Polyline
	},

	methods: {

		init() {
			this.lines.forEach(this.addLine);

			var socket = io.connect();

			socket.on('test', data => { console.log(data); });

			socket.on('vehiclePosition', data => {
				var id = data.train_id;
				var position = {lat: parseFloat(data.position.latitude), lng: parseFloat(data.position.longitude)};

				if (typeof this.trains[id] !== 'undefined') {
					if (typeof data.delete !== 'undefined') {
						//
					} else {
						var marker = this.trains[id];
						marker.position = position;
					}
				} else {
					this.trains[id] = {
						enabled: true,
						position: position,
						title: id.toString(),
						zIndex: 100,
						icon: {
							url: 'static/tag_train_map_' + data.line.toString() + '.png',
							anchor: {x: 25, y: 36}
						}
					};

					this.markers.push(this.trains[id]);
				}
			});
		},

		addLine(line) {
			this.polylines.push({
				enabled: true,
				path: line.path,
				geodesic: true,
				color: '#' + line.color,
				opacity: 1.0,
				weight: 4
			});

			line.stops.forEach(stop => {
				this.markers.push({
					enabled: true,
					position: stop.coords,
					title: stop.name,
					zIndex: 1,
					icon: {
						path: google.maps.SymbolPath.CIRCLE,
						strokeColor: '#' + line.color,
						strokeWeight: 6,
						scale: 3
					}
				});
			});
		}

	},

	activate(done) {
		loaded.then(() => {
			done();
		});

		load('AIzaSyDGyCvIEFSzj8zhpsXCYxEPgW6D_PY23OA');
	},

	ready() {
		this.$http.get('/api/lines').then(response => {
			this.$set('lines', response.data);
			this.init();
		}, response => {
			console.log('error fetching lines');
		});
	}

};
