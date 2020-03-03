
const fs = require('fs');
const path = require('path');

const Cart = require('./cart');


class Product {

    constructor(id, title, imageUrl, description, price){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){

        const p = path.join(__dirname, '..', 'data', 'products.json');
        
        fs.readFile(p, (err, fileContent) => {
            
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
    
            }

            if (this.id){
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                })
            }
            else{
                this.id = Math.random().toString();

                products.push(this); 
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                })
            }
            
        }) 
        

    }

    static deleteById(id){

        const p = path.join(__dirname, '..', 'data', 'products.json');

        fs.readFile(p, (err, fileContent) => {

            if (err){
                cb([]);        
            }else{
                const product = (JSON.parse(fileContent)).filter(prod => prod.id === id)[0];
                
                const updatedProducts = (JSON.parse(fileContent)).filter(p => p.id !== id);
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    if (!err){
                        Cart.deleteProduct(id, product.price);
                    }
                })
            }
        })


    }

    

    static fetchAllProducts(cb){
        
        const p = path.join(__dirname, '..', 'data', 'products.json');

        
        fs.readFile(p, (err, fileContent) => {

            if (err){
                cb([]);        
            }else{
                cb(JSON.parse(fileContent));
            }
        })
        
    }


    static findById(id, cb){

        const p = path.join(__dirname, '..', 'data', 'products.json');

        fs.readFile(p, (err, fileContent) => {

            if (err){
                cb([]);        
            }else{
                const product = (JSON.parse(fileContent)).find(p => p.id === id);
                cb(product);
            }
        })
        
    }
}




module.exports =  Product;