exports.get404 = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        formCSS: false,
        productCSS: false,
        cartCSS: false,
        activeShop: false,
        activeAddProduct: false,
        activeProducts: false,
        activeCart: false,
        activeOrders: false,
        activeAdminProduct: false
    });
};