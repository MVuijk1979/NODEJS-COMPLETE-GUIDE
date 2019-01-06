const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = {
        products: [],
        totalPrice: 0
      };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct
        };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {
          id: id,
          qty: 1
        };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    // Read Cart Data from file
    fs.readFile(p, (err, fileContent) => {
      // When there is no data in Cart then simply return immediately
      if (err) {
        return;
      } else {
        const updatedCart = { ...JSON.parse(fileContent)
        };
        // Find the product to determine the quantity of the product in Cart
        const product = updatedCart.products.find(prod => prod.id === id);
        // When there is no product then immediately return 
        if (!product) {
          return;
        }
        const productQty = product.qty;
        // Create an array with all the products which doesn't match the id
        // For that the filter option has been used
        updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
        // Compute the total price minus the product price multiply the product quantity
        updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
        // Write file with updated cart
        fs.writeFile(p, JSON.stringify(updatedCart), err => {
          console.log(err);
        });
      }
    })
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb(null);
      } else {
        const cart = JSON.parse(fileContent);
        cb(cart);
      }
    })
  }
};