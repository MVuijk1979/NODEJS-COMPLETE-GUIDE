const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                // Search Existing Product Index 
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                // Create a new array and copy the existing products in this new array
                const updatedProducts = [...products];
                // Update the existing Product with the index we have found 
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    if (err) {
                        console.log(err);
                    };
                });
            } else {
                // Generate new id with Math function
                this.id = Math.random().toString();
                // Push the new Product to the array
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    if (err) {
                        console.log(err);
                    };
                });
            };
        });
    }

    
    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            // Create an array with alle the products which doesn't match the id
            // For that the filter option has been used
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (err) {
                    console.log(err);
                } else {
                    // Remove product also from Cart (if needed)
                    Cart.deleteProduct(id, product.price);
                }
            });
        });        
    }

    
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}