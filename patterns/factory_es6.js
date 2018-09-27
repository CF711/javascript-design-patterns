class Vehicle {
	constructor(options) {
		this.vehicleType = options.vehicleType || '';
		this.tires = 4;
		this.make = options.make;
		this.model = options.model;
		this.color = options.color || 'blue';
		this.hasTrunk = false;
		this.hasProtectedTruckBed = false;
	}

	displayVehicle() {
		if (!this.vehicleType) {
			throw new Error('Can not call displayVehicle on a generic vehicle.');
		}
		console.log('You have a ${color} ${make} ${model}');
	}
}

class Car extends Vehicle {
	constructor(options) {
		super(options);
		this.hasTrunk = options.hasTrunk || false;
	}
}

class Truck extends Vehicle {
	constructor(options) {
		super(options);
		this.hasProtectedTruckBed = options.hasProtectedTruckBed || false;
	}
}

class VehicleFactory {
	constructor() {}

	createVehicle(options) {
		let vehicle;
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
}

let factory = new VehicleFactory();
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