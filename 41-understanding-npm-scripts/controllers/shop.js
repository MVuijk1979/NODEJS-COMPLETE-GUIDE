const Product = require('../models/product');
const Cart = require('../models/cart');

// Read all Products from the Database
exports.getIndex = (req, res, next) => {
  Product
    .findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        activeShop: true,
        activeAddProduct: false,
        activeProducts: false,
        activeCart: false,
        activeOrders: false,
        activeAdminProduct: false,
        formCSS: false,
        productCSS: true
      });
    })
    .catch(err => console.log(err));
};


exports.getProducts = (req, res, next) => {
  Product
    .findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        activeShop: false,
        activeAddProduct: false,
        activeProducts: true,
        activeCart: false,
        activeOrders: false,
        activeAdminProduct: false,
        formCSS: false,
        productCSS: true
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product
    .findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        pageTitle: product.title,
        product: product,
        activeShop: false,
        activeAddProduct: false,
        activeProducts: true,
        activeCart: false,
        activeOrders: false,
        activeAdminProduct: false,
        formCSS: false,
        productCSS: false
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render('shop/cart', {
            pageTitle: 'Your Cart',
            activeShop: false,
            activeAddProduct: false,
            activeProducts: false,
            activeCart: true,
            activeOrders: false,
            activeAdminProduct: false,
            formCSS: false,
            productCSS: false,
            products: products
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};


exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user
  .getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts({ where: { id: prodId } });
  })
  .then(products => {
    let product;
    if (products.length > 0 ) {
      product = products[0]
    }
    let newQuantity = 1;
    if (product){
      //...
    }
    return Product
      .findByPk(prodId)
      .then(product => {
        return fetchedCart
          .addProduct(product, { 
            through: { quantity: newQuantity } 
          });
      })
      .catch(err => console.log(err));
  })
  .then(() => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err));
};


exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // find product with id so that we also have the price for our next callback
  Product.findById(prodId, product => {
    // Delete product from the cart with id and price
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};


exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    activeShop: false,
    activeAddProduct: false,
    activeProducts: false,
    activeCart: false,
    activeOrders: false,
    activeAdminProduct: false,
    formCSS: false,
    productCSS: false
  })
};


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    activeShop: false,
    activeAddProduct: false,
    activeProducts: false,
    activeCart: false,
    activeOrders: true,
    activeAdminProduct: false,
    formCSS: false,
    productCSS: false
  })
};