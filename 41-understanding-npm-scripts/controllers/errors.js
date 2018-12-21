exports.get404 = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        formCSS: false,
        productCSS: false,
        activeShop: false,
        activeAddProduct: false,
        activeProducts: false,
        activeCart: false,
        activeAdminProduct: false
    });
};