

const fs = require('fs');
const path = require('path');


const p = path.join(__dirname, '..', 'data', 'cart.json');

class Cart {

    static addProduct(id, productPrice){
        //fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if (!err){
                cart = JSON.parse(fileContent);
            }

            //analyze the cart => find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            //add the new product / increase quantity
            if (existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;

            }else{
                updatedProduct = { id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + parseInt(productPrice);
            
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })

    }

    static deleteProduct(id, productPrice){
        // const p = path.join(__dirname, '..', 'data', 'cart.json');

        fs.readFile(p, (err, fileContent) => {
            if (err){
                return ;
            }
            const cart = JSON.parse(fileContent);
            const updatedCart = {...cart};
            const product = updatedCart.products.find(prod => prod.id === id);
            if (!product){
                return ;
            }
            const productQty = product.qty;

            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - (productPrice * productQty);

            // console.log(updatedCart);
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            })

        })
    }

    static getCart(cb){
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err){
                cb(null);
            }else{
                cb(cart);
            }
        })
    }
}


module.exports = Cart;