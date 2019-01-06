const Product = require('../models/product');
const Cart = require('../models/cart');


exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index', {
                prods: rows,
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
        }).catch(err => console.log(err));
};


exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list', {
                prods: rows,
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
        }).catch(err => console.log(err));
};


exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(([product]) => {
            res.render('shop/product-detail', {
                pageTitle: product.title,
                product: product[0],
                activeShop: false,
                activeAddProduct: false,
                activeProducts: true,
                activeCart: false,
                activeOrders: false,
                activeAdminProduct: false,
                formCSS: false,
                productCSS: false
            });
        }).catch(err => console.log(err)); 
};

exports.getCart = (req, res, next) => {
    // Get cart data
    Cart.getCart(cart => {
        // Get product data
        Product.fetchAll(products => {
            const cartProducts = [];
            // Check if product is part of cart
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    // Save the product in the array
                    // Save the quantity in the array
                    cartProducts.push({
                        productData: product,
                        qty: cartProductData.qty
                    });
                }
            }
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
                products: cartProducts
            });
        });
    });
};


exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
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