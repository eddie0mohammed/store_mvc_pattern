

const Product = require('../models/product');



const getAddProduct = (req, res, next) => {

    
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })

}

const postAddProduct = (req, res, next) => {
 

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(null, title, imageUrl, description, price);
    
    product.save();

    res.redirect('/');


}

const getEditProduct = (req, res, next) => {

    const editMode = req.query.edit;
    // console.log(editMode);
    if (!editMode){
        return res.redirect('/');
    }
    
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
        if (!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })
    })
    

}

const getProducts = (req, res) => {

    Product.fetchAllProducts((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        })
    })

}

const postEditProduct = (req, res) => {

    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(productId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice);

    updatedProduct.save();
    res.redirect('/admin/products');

}

const postDeleteProduct = (req, res) => {
    
    const productId = req.body.productId;
    Product.deleteById(productId);
    res.redirect('/admin/products');

}

module.exports = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct,
    getEditProduct: getEditProduct,
    getProducts: getProducts,
    postEditProduct: postEditProduct,
    postDeleteProduct: postDeleteProduct
}