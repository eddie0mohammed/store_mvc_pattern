
const Product = require('../models/product');
const Cart = require('../models/cart');


const getProducts = (req, res) => {
    
    Product.fetchAllProducts((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
          
    
        })
    });    
}

const getProduct = (req, res) => {

    const id = req.params.productId;
    Product.findById(id, (product) => {
        
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        })
    })
    

}


const getIndex = (req, res) => {

    Product.fetchAllProducts((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
          
    
        })
    }); 

}


const getCart = (req, res) => {

    Cart.getCart(cart => {

        Product.fetchAllProducts(products => {

            const cartProducts = [];
            for (let product of products){
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }

            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            })
        })

    })
    

}

const postCart = (req, res) => {

    const prodId = req.body.productId;
    
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    })

    res.redirect('/cart');

    
}

const getOrders = (req, res) => {

    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Orders'
    })
}

const getCheckout = (req, res) => {

    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}

const postDeleteItem = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })

}



module.exports = {
    getProducts: getProducts,
    getProduct: getProduct,
    getIndex: getIndex,
    getCart: getCart,
    postCart: postCart,
    getOrders: getOrders,
    getCheckout: getCheckout,
    postDeleteItem: postDeleteItem
}