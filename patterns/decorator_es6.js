class Coffee {
	constructor() {
		if (new.target === Coffee) {
			throw new TypeError("Cannont instantiate class 'Coffee'. Abstract classes can not be created directly");
		}
	}

	getCost() {}
	getIngredients() {}
}

class TallCoffee extends Coffee {
	constructor() {
		super();
		this.cost = 2.45;
		this.ingredients = 'Coffee';
	}

	getCost() {
		return this.cost;
	}

	getIngredients() {
		return this.ingredients;
	}
}

class CoffeeDecorator extends Coffee {

	constructor(coffee) {
		if (new.target === CoffeeDecorator) {
			throw new TypeError("Cannot instantiate class 'CoffeeDecorator'. Abstract classes can not be created directly.");
		} 
		super();
		this.decoratedCoffee = coffee;
	}

	getCost() {
		if (typeof(this.decoratedCoffee) === CoffeeDecorator) {
			throw new TypeError('Cannot call method \'getCost\' of abstract class.');
		}
		return this.decoratedCoffee.getCost();
	}

	getIngredients() {
		if (typeof(this.decoratedCoffee) === CoffeeDecorator) {
			throw new TypeError('Cannot call method \'getIngredients\' of abstract class.');
		}
		return this.decoratedCoffee.getIngredients();
	}
}

class WithMilk extends CoffeeDecorator {
	constructor(coffee) {
		super(coffee);
	}

	getCost() {
		return super.getCost() + 0.45;
	}

	getIngredients() {
		return super.getIngredients() + ', Milk';
	}
}

class WithChocolate extends CoffeeDecorator {
	constructor(coffee) {
		super(coffee);
	}

	getCost() {
		return super.getCost() + .55;
	}
		

	getIngredients() {
		return super.getIngredients() + ', Chocolate';
	}
}

let coffee = new TallCoffee();
console.log(coffee.getCost(), coffee.getIngredients());

let coffeeWithMilk = new WithMilk(coffee);
console.log(coffeeWithMilk.getCost(), coffeeWithMilk.getIngredients());

let coffeeWithChocolate = new WithChocolate(coffee);
console.log(coffeeWithChocolate.getCost(), coffeeWithChocolate.getIngredients());

let coffeeWithMilkAndChocolate = new WithChocolate(coffeeWithMilk);
console.log(coffeeWithMilkAndChocolate.getCost(), coffeeWithMilkAndChocolate.getIngredients());