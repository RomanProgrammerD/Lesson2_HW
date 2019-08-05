var Product = /** @class */ (function () {
    function Product(n, d, p) {
        this.log = [];
        this.name = n;
        this.description = d;
        if (p <= 0) {
            this.price = -p;
        }
        else {
            this.price = p;
        }
        this.log.push("A new product was created");
    }
    Product.prototype.getPrice = function () {
        return this.price;
    };
    Product.prototype.setPrice = function (p) {
        if (p > this.price) {
            this.price = p;
            this.log.push("The price of the " + this.name + " is " + this.price);
        }
        return this;
    };
    Product.prototype.add = function (s) {
        this.log.push("The " + this.name + " is in " + s.name);
        return this;
    };
    Product.prototype.removeProduct = function (s) {
        this.log.push("The " + this.name + " was removed from " + s.name);
        this.name = "";
        return this;
    };
    Product.prototype.getHistory = function () {
        return this.log;
    };
    return Product;
}());
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart(n, o, m) {
        this.products = [];
        this.log = [];
        this.name = n;
        this.owner = o;
        if (m <= 0) {
            this.maxCount = -m;
        }
        else {
            this.maxCount = m;
        }
        this.log.push("A new shopping cart was created");
    }
    ShoppingCart.prototype.addNewProduct = function (p, d) {
        var _this = this;
        if (this.products.length < this.maxCount) {
            p.dateOfAddingToCart = d;
            this.products.push(p);
            this.log.push("The " + p.name + " was added");
        }
        else {
            var minId = 0;
            this.products.forEach(function (item, i) {
                if (item.price < _this.products[minId].price) {
                    minId = i;
                }
            });
            var name_ = this.products[minId].name;
            this.products.splice(minId, 1);
            this.log.push("The " + name_ + " was removed");
            p.dateOfAddingToCart = d;
            this.products.push(p);
            this.log.push("The " + p.name + " was added");
        }
        return this;
    };
    ShoppingCart.prototype.removeProduct = function (id) {
        if (id < 0) {
            console.log("Wrong id!");
            return this;
        }
        var name_ = this.products[id].name;
        this.products.splice(id, 1);
        this.log.push("The " + name_ + " was removed");
        return this;
    };
    ShoppingCart.prototype.getAveragePrice = function () {
        var sum = 0;
        this.products.forEach(function (item) {
            sum += item.price;
        });
        this.log.push("The average price is " + sum / this.products.length);
        return sum / this.products.length;
    };
    ShoppingCart.prototype.getProducts = function () {
        return this.products;
    };
    ShoppingCart.prototype.getFormattedListOfProducts = function () {
        var _this = this;
        var formattedListOfProducts = [];
        this.products.forEach(function (item) {
            formattedListOfProducts.push(item.name + " - is on " + _this.name + " from " + item.dateOfAddingToCart + ". Detailed product description: " + item.description);
        });
        return formattedListOfProducts;
    };
    ShoppingCart.prototype.getTotalPrice = function () {
        var sum = 0;
        this.products.forEach(function (item) {
            sum += item.price;
        });
        this.log.push("The total price is " + sum);
        return sum;
    };
    ShoppingCart.prototype.getHistory = function () {
        return this.log;
    };
    return ShoppingCart;
}());
var apple = new Product("Apple", "Tasty", 1);
var plum = new Product("Plum", "Not so tasty", 2);
var cherry = new Product("Cherry", "Very tasty", 3);
var firstCart = new ShoppingCart("FirstCart", "Valerka", 2);
firstCart.addNewProduct(apple, "12.10.2019").addNewProduct(plum, "12.10.2019").addNewProduct(cherry, "12.10.2019");
console.log(firstCart.getFormattedListOfProducts());
console.log(firstCart.getAveragePrice());
console.log(firstCart.getTotalPrice());
console.log(firstCart.getHistory());
