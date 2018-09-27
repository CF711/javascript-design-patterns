class Customer {

	constructor(customerType) {
        this.itemsCost = [];
        this.customerType = customerType;
	}

	addItem(item) {
		this.itemsCost.push(item);
	}

	setCustomerType(customerType) {
		this.customerType = customerType;
	}

	getTotal() {
		let totalCost = 0;
		for (let i in this.itemsCost) {
			totalCost += this.itemsCost[i];
		}
		return this.customerType.getCustomerPrice(totalCost);
	}
}

// interface
class CustomerBillingStrategy {
	constructor() {
		if (this.constructor === CustomerBillingStrategy) {
			throw new Error("Cannot instantiate CustomerBillingStrategy, type: interface");
		}
	}

	getCustomerPrice(price) {
		throw new Error('Cannot call method of type interface');
	}
}

// Regular customer strategy (full price)
class RegularCustomer extends CustomerBillingStrategy {
	constructor() {
		super();
	}

	getCustomerPrice(price) {
		return price;
	}
}

// Preferred Customer strategy (20% off)
class PreferredCustomer extends CustomerBillingStrategy {
	constructor() {
		super();
	}

	getCustomerPrice(price) {
		return price * .8;
	}
}

const firstCustomer = new Customer(new RegularCustomer());
const secondCustomer = new Customer(new PreferredCustomer());

const itemArray = [1.30, 1.45, 7.20];

for (let item in itemArray) {
	firstCustomer.addItem(itemArray[item]);
	secondCustomer.addItem(itemArray[item]);
}

console.log('Regular customer', firstCustomer.getTotal());
console.log('Preferred customer', secondCustomer.getTotal());