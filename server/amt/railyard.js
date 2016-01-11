function Railyard() {

	this.trains = {};

}

Railyard.prototype.onPositionUpdate = function (line, data) {
	var id = data.train_id;
	var exists = typeof this.trains[id] !== 'undefined';
	var deleted = data.deleted || false;

	if (!deleted) {
		this.trains[id] = data;
	}

	if (exists && deleted) {
		delete this.trains[id];
	}
};

export default Railyard;
