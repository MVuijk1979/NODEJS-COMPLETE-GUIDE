const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        formCSS: true,
        productCSS: true,
        activeShop: false,
        activeAddProduct: true,
        activeProducts: false,
        activeCart: false,
        activeOrders: false,
        activeAdminProduct: false,
        editing: false
    });
};


exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    // Create a new Product where Id is set to null
    // Id will receive a value in the model product functions
    const product = new Product(null, title, imageUrl, description, price);
    product
        .save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
};


// Edit Product
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            formCSS: true,
            productCSS: true,
            activeShop: false,
            activeAddProduct: false,
            activeProducts: false,
            activeCart: false,
            activeOrders: false,
            activeAdminProduct: false,
            editing: editMode,
            product: product
        });
    });
};


// Edit Product
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(
        prodId,
        updatedTitle,
        updatedImageUrl,
        updatedDesc,
        updatedPrice
    );
    updatedProduct.save();
    res.redirect('/admin/products');
};


// Delete Product
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
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
