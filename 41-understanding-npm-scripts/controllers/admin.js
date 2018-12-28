const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: 'admin/add-product',
        formCSS: true,
        productCSS: true,
        activeShop: false,
        activeAddProduct: true,
        activeProducts: false,
        activeCart: false,
        activeOrders: false,
        activeAdminProduct: false
    });
};


exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, price, description);
    product.save();
    res.redirect('/');
};


exports.getProducts = (req, res, next) => {
    Product.fetchAll(products =>
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            activeShop: false,
            activeAddProduct: false,
            activeProducts: false,
            activeCart: false,
            activeOrders: false,
            activeAdminProduct: true,
            formCSS: false,
            productCSS: true
        })
    );
};
