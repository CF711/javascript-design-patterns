var Vehicle = function(options) {
	this.vehicleType = options.vehicleType || '';
	this.numOfTires = 4;
	this.make = options.make;
	this.model = options.model;
	this.color = options.color || 'blue';
	this.hasTrunk = false;
	this.hasProtectedTruckBed = false;
}

Vehicle.prototype.displayVehicle = function() {
	if (!this.vehicleType) {
		throw new Error('Can not call displayVehicle on a generic vehicle');
	}
	console.log('You have a %s %s %s', this.color, this.make, this.model);
}

var Car = function(options) {
	Vehicle.call(this, options);
	this.hasTrunk = options.hasTrunk || false;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

var Truck = function(options) {
	Vehicle.call(this, options);
	this.hasProtectedTruckBed = options.hasProtectedTruckBed || false;
}

Truck.prototype = Object.create(Vehicle.prototype);
Truck.prototype.constructor = Truck;

var VehicleFactory = function() {}

VehicleFactory.prototype.createVehicle = function(options) {
	var vehicle;
	switch(options.vehicleType) {
		case "car":
			vehicle = Car;
			break;
		case "truck":
			vehicle = Truck;
			break;
		default:
			vehicle = Car;
	}
	return new vehicle(options);
}

var factory = new VehicleFactory();
var car = factory.createVehicle({
	vehicleType: "car",
	color: "red",
	make: "Toyota",
	model: "Camry",
	hasTrunk: true
});

var truck = factory.createVehicle({
	vehicleType: "truck",
	color: "black",
	make: "Ford",
	model: "F-150",
	hasProtectedTruckBed: true
});

car.displayVehicle();
truck.displayVehicle();