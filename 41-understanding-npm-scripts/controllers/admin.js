const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        formCSS: true,
        productCSS: true,
        cartCSS: false,
        activeShop: false,
        activeAddProduct: true,
        activeProducts: false,
        activeCart: false,
        activeOrders: false,
        activeAdminProduct: false,
        editing: false
    });
};


// Add Product to Database
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
  .createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(result => {
    // console.log(result);
    console.log('--> Created Product');
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log(err);
  });
};


// Edit Product -> GET
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
      return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user
  .getProducts({ where: { id: prodId } })
  .then(products => {
    const product = products[0];
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      formCSS: true,
      productCSS: true,
      cartCSS: false,
      activeShop: false,
      activeAddProduct: false,
      activeProducts: false,
      activeCart: false,
      activeOrders: false,
      activeAdminProduct: false,
      editing: editMode,
      product: product
    });
  })
  .catch(err => console.log(err));
};


// Edit Product -> POST
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    Product
      .findByPk(prodId)
      .then(product => {
        product.title = updatedTitle,
        product.price = updatedPrice,
        product.imageUrl = updatedImageUrl,
        product.description = updatedDesc
        return product.save();
      })
      .then(result => {
        console.log('--> Updated Product!');
        res.redirect('/admin/products');
      })
      .catch(err => console.log(err));
};


// Delete Product
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product
      .findByPk(prodId)
      .then(product => {
        return product.destroy();
      })
      .then(result => {
        console.log('--> Deleted Product!')
        res.redirect('/admin/products');
      })
      .catch(err => console.log(err));
};


// Get all Products
exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then(products => {
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
        cartCSS: false,
        productCSS: true
      });
    })
    .catch(err => console.log(err));
};