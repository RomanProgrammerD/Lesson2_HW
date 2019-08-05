interface IProduct{
	name: string;
	description: string;
	price: number;
	dateOfAddingToCart: string;
	getPrice(): number;
	setPrice(p: number): Product;
	add(s: ShoppingCart): Product;
	removeProduct(s: ShoppingCart): Product;
	getHistory(): Array<string>;
}

interface IShoppingCart{
	name: string;
	owner: string;
	maxCount: number;
	addNewProduct(p: Product, d: string): ShoppingCart;
	removeProduct(id: number): ShoppingCart;
	getAveragePrice(): number;
	getProducts(): Array<IProduct>;
	getFormattedListOfProducts(): Array<string>;
	getTotalPrice(): number;
	getHistory(): Array<string>;
}

class Product implements IProduct{
	name: string;
	description: string;
	price: number;
	dateOfAddingToCart: string;
	private log: Array<string> = [];
	constructor(n: string, d: string, p: number)
	{
		this.name = n;
		this.description = d;
		if(p<=0)
		{
			this.price = -p;
		}
		else
		{
			this.price = p;
		}
		this.log.push("A new product was created");
	}
	getPrice()
	{
		return this.price;
	}
	setPrice(p: number)
	{
		if(p>this.price)
		{
			this.price = p;
			this.log.push(`The price of the ${this.name} is ${this.price}`);
		}
		return this;
	}
	add(s: ShoppingCart)
	{
		this.log.push(`The ${this.name} is in ${s.name}`);
		return this;
	}
	removeProduct(s: ShoppingCart)
	{
		this.log.push(`The ${this.name} was removed from ${s.name}`);
		this.name = "";
		return this;
	}
	getHistory()
	{
		return this.log;
	}
}

class ShoppingCart implements IShoppingCart{
	name: string;
	owner: string;
	maxCount: number;
	private products: Array<IProduct> = [];
	private log: Array<string> = [];
	constructor(n: string, o: string, m: number)
	{
		this.name = n;
		this.owner = o;
		if(m<=0)
		{
			this.maxCount = -m;
		}
		else
		{
			this.maxCount = m;
		}
		this.log.push("A new shopping cart was created");
	}
	addNewProduct(p: Product, d: string)
	{
		if(this.products.length < this.maxCount)
		{
			p.dateOfAddingToCart = d;
			this.products.push(p);
			this.log.push(`The ${p.name} was added`);

		}
		else
		{
			var minId = 0;
			this.products.forEach((item, i) => {
				if(item.price< this.products[minId].price)
				{
					minId = i;
				}
			});
			const name_ = this.products[minId].name;
			this.products.splice(minId, 1);
			this.log.push(`The ${name_} was removed`);
			p.dateOfAddingToCart = d;
			this.products.push(p);
			this.log.push(`The ${p.name} was added`);
		}
		return this;
	}
	removeProduct(id: number)
	{
		if(id<0)
		{
			console.log("Wrong id!");
			return this;
		}
		const name_ = this.products[id].name;
		this.products.splice(id, 1);
		this.log.push(`The ${name_} was removed`);
		return this;
	}
	getAveragePrice()
	{
		let sum = 0;
		this.products.forEach((item) => {
			sum += item.price;
		});
		this.log.push("The average price is " + sum / this.products.length);
		return sum / this.products.length;
	}
	getProducts()
	{
		return this.products;
	}
	getFormattedListOfProducts()
	{
		var formattedListOfProducts = [];
		this.products.forEach((item) => {
			formattedListOfProducts.push(`${item.name} - is on ${this.name} from ${item.dateOfAddingToCart}. Detailed product description: ${item.description}`);
		});
		return formattedListOfProducts;
	}
	getTotalPrice()
	{
		let sum = 0;
		this.products.forEach((item) => {
			sum += item.price;
		});
		this.log.push("The total price is " + sum);
		return sum;
	}
	getHistory()
	{
		return this.log;
	}
}

const apple = new Product("Apple", "Tasty", 1);
const plum = new Product("Plum", "Not so tasty", 2);
const cherry = new Product("Cherry", "Very tasty", 3);

let firstCart = new ShoppingCart("FirstCart", "Valerka", 2);
firstCart.addNewProduct(apple, "12.10.2019").addNewProduct(plum,"12.10.2019").addNewProduct(cherry, "12.10.2019");
console.log(firstCart.getFormattedListOfProducts());
console.log(firstCart.getAveragePrice());
console.log(firstCart.getTotalPrice());
console.log(firstCart.getHistory());