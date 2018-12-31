const Product = require('../models/product');
const Cart = require('../models/cart');


exports.getIndex = (req, res, next) => {
    Product.fetchAll(products =>
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
        })
    );
};


exports.getProducts = (req, res, next) => {
    Product.fetchAll(products =>
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
        })
    );
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
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
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        activeShop: false,
        activeAddProduct: false,
        activeProducts: false,
        activeCart: true,
        activeOrders: false,
        activeAdminProduct: false,
        formCSS: false,
        productCSS: false
    })
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
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
