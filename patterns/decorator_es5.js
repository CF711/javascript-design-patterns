var Coffee = function() {
	if (this.constructor === Coffee) {
		throw new Error("Cannont instantiate class 'Coffee'. Abstract classes can not be created directly");
	}
}

Coffee.prototype.getCost = function() {
	if (this === Coffee) {
		throw new TypeError('Cannot call method \'getCost\' of abstract class.');
	}
}
    
Coffee.prototype.getIngredients = function() {
	if (this === Coffee) {
		throw new TypeError('Cannot call method \'getCost\' of abstract class.');
	}
}

var TallCoffee = function() {
	Coffee.call(this);
	this.cost = 2.45;
	this.ingredients = 'Coffee';
}

TallCoffee.prototype.getCost = function() {
	return this.cost;
}
    
TallCoffee.prototype.getIngredients = function() {
	return this.ingredients;
}

var CoffeeDecorator = function(coffee) {
	if (this.constructor === CoffeeDecorator) {
		throw new Error("Cannot instantiate class 'CoffeeDecorator'. Abstract classes can not be created directly.");
	}
	Coffee.call(this);
	this.decoratedCoffee = coffee;
}

CoffeeDecorator.prototype.getCost = function() {
	if (typeof(this.decoratedCoffee) === CoffeeDecorator) {
		throw new TypeError('Cannot call method \'getCost\' of abstract class.');
	}
    return this.decoratedCoffee.getCost();
}
	
CoffeeDecorator.prototype.getIngredients = function() {
	if (typeof(this.decoratedCoffee) === CoffeeDecorator) {
		throw new TypeError('Cannot call method \'getIngredients\' of abstract class.');
	}
	return this.decoratedCoffee.getIngredients();
}

var WithMilk = function(coffee){
	CoffeeDecorator.call(this, coffee);
};

WithMilk.prototype = Object.create(CoffeeDecorator.prototype);
WithMilk.prototype.constructor = WithMilk;

WithMilk.prototype.getCost = function() {
	return CoffeeDecorator.prototype.getCost.call(this) + .45;
}

WithMilk.prototype.getIngredients = function() {
	return CoffeeDecorator.prototype.getIngredients.call(this) + ', Milk';
}

var WithChocolate = function(coffee){
	CoffeeDecorator.call(this, coffee);
};

WithChocolate.prototype = Object.create(CoffeeDecorator.prototype);
WithChocolate.prototype.constructor = WithChocolate;

WithChocolate.prototype.getCost = function() {
	return CoffeeDecorator.prototype.getCost.call(this) + .55;
}

WithChocolate.prototype.getIngredients = function() {
	return CoffeeDecorator.prototype.getIngredients.call(this) + ', Chocolate';
}

var coffee = new TallCoffee();
console.log(coffee.getCost(), coffee.getIngredients());

var coffeeWithMilk = new WithMilk(coffee);
console.log(coffeeWithMilk.getCost(), coffeeWithMilk.getIngredients());

var coffeeWithChocolate = new WithChocolate(coffee);
console.log(coffeeWithChocolate.getCost(), coffeeWithChocolate.getIngredients());

var coffeeWithMilkAndChocolate = new WithChocolate(coffeeWithMilk);
console.log(coffeeWithMilkAndChocolate.getCost(), coffeeWithMilkAndChocolate.getIngredients());
