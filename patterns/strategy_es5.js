var Customer = function(customerType) {
	this.customerType = customerType || '';
    this.itemsCost = [];
}

Customer.prototype.addItem = function(price) {
    this.itemsCost.push(price);
}

Customer.prototype.setCustomerType = function(customerType) {
    this.customerType = customerType;
}
    
Customer.prototype.getTotal = function() {
    var items = this.itemsCost;
    var totalCost = 0;
    for (var i = 0; i < items.length; i++) {
     	totalCost += items[i];
    }
    return this.customerType.getCustomerPrice(totalCost);
}

// interface
var CustomerBillingStrategy = function() {
	if (this.constructor === CustomerBillingStrategy) {
		throw new Error('Cannot instantiate an interface');
	}
}

CustomerBillingStrategy.prototype.getCustomerPrice = function(price) {
	throw new Error('Cannot call method of type interface');
}

var RegularCustomerStrategy = function() {
	CustomerBillingStrategy.call(this);
}

RegularCustomerStrategy.prototype = Object.create(CustomerBillingStrategy.prototype);
RegularCustomerStrategy.prototype.constructor = RegularCustomerStrategy;

RegularCustomerStrategy.prototype.getCustomerPrice = function (price) {
    return price;
}

var PerferredCustomerStrategy = function() {
	CustomerBillingStrategy.call(this);
}

PerferredCustomerStrategy.prototype = Object.create(CustomerBillingStrategy.prototype);
PerferredCustomerStrategy.prototype.constructor = PerferredCustomerStrategy;

PerferredCustomerStrategy.prototype.getCustomerPrice = function (price) {
    return price * .8;
}

// Runner
var firstCustomer = new Customer(new RegularCustomerStrategy());
var secondCustomer = new Customer(new PerferredCustomerStrategy());

var itemArray = [1.30, 1.45, 7.20];

for (var item in itemArray) {
	firstCustomer.addItem(itemArray[item]);
	secondCustomer.addItem(itemArray[item]);
}

console.log(firstCustomer.getTotal());
console.log(secondCustomer.getTotal());