const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
    Product.fetchAll(products =>
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            activeShop: false,
            activeAddProduct: false,
            activeProducts: true,
            activeCart: false,
            activeAdminProduct: false,
            formCSS: false,
            productCSS: true
        })
    );
};


exports.getIndex = (req, res, next) => {
    Product.fetchAll(products =>
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            activeShop: true,
            activeAddProduct: false,
            activeProducts: false,
            activeCart: false,
            activeAdminProduct: false,
            formCSS: false,
            productCSS: false
        })
    );
};


exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        activeShop: false,
        activeAddProduct: false,
        activeProducts: false,
        activeCart: true,
        activeAdminProduct: false,
        formCSS: false,
        productCSS: false
    })
};


exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        activeShop: false,
        activeAddProduct: false,
        activeProducts: false,
        activeCart: false,
        activeAdminProduct: false,
        formCSS: false,
        productCSS: false
    })
};