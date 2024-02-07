const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
var cookieParser = require("cookie-parser");
var helper = require('./helper');

app.set("view engine", "html");
app.engine('html', ejs.renderFile)
app.use(express.static(path.join(__dirname, 'views'))); // Assuming your JS files are in the "js" folder
app.use(express.static(path.join(__dirname, 'uploads'))); 
app.use(express.static(path.join(__dirname, 'js'))); 

app.listen(80, () => {
  console.log("server is running")
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//**********************api  */
var prodRoute = require('./api/product')
var cateRoute = require('./api/category')
var supRoute = require('./api/supplier')
app.use('/product', prodRoute)
app.use('/category', cateRoute)
app.use('/supplier', supRoute) 
//*************************** */ 



app.get('/homePage',(req,res,next)=>{
  res.sendFile(path.join(__dirname,'views/home_page.html'))
})

app.get('/productList/:id',(req,res,next)=>{
  res.render('productList');
})
app.get('/productList',(req,res,next)=>{
  res.render('productList');
})
app.get('/productDesciption/:id',(req,res,next)=>{
  res.render('productDesciption');
})
app.get('/recomended',(req,res,next)=>{
  res.render('recomendedProvider');
})
app.get('/categoryList/:id',(req,res,next)=>{
  res.render('category');
})


///////////


let summary;
let cart = [];
let shippingInfo = {
    country: 'us',
    name: '',
    address: '',
    zipCode: '',
    phoneNumber: '',
    paymentMethod: 'master'
};

// let cart = [
//     {
//         "image": "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/8c651ea22775bcab0b67882cf5de57af.jpg?imageView2/2/w/800/q/70/format/webp",
//         "name": "Men's Contrast Color Hoodies Fashion Casual Hooded Sweatshirt For Fall Winter, Men's Clothing",
//         "supplier_name": "YSL",
//         "price": 49.89,
//         "dis_price": 19.99,
//         "qty_product": 10,
//         "product_id": 1,
//         "shipping_date": "",
//         "qty_selected": "2",
//         "size": "XS"
//     },
//     {
//         "image": "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/8c651ea22775bcab0b67882cf5de57af.jpg?imageView2/2/w/800/q/70/format/webp",
//         "name": "Men's Contrast Color Hoodies Fashion Casual Hooded Sweatshirt For Fall Winter, Men's Clothing",
//         "supplier_name": "YSL",
//         "price": 49.89,
//         "dis_price": 19.99,
//         "qty_product": 10,
//         "product_id": 2,
//         "shipping_date": "",
//         "qty_selected": "1",
//         "size": "S"
//     }
// ]

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
})

app.get('/header', (req, res, next) => {
    res.render('header', { summary: summary })
})

app.get('/footer', (req, res, next) => {
    res.sendFile(path.join(__dirname, "/views/footer.html"));
})

app.get('/cart', (req, res, next) => {
    if (req.query.cart) {
        cart = JSON.parse(req.query.cart);
    }
    summary = helper.getCartSummary(cart);
    res.sendFile(path.join(__dirname, "/views/cart.html"));
})

app.get('/getCartInfo', (req, res, next) => {
    res.render('cart-info', {
        cart: cart,
        summary: summary,
        shippingInfo: shippingInfo,
        countryData: helper.countryData,
        paymentMethodData: helper.paymentMethodData
    });
})

app.put('/updateCart', (req, res, next) => {
    cart = cart.map((item) => {
        if (item.product_id.toString() === req.body.product_id.toString()) {
            item = { ...item, ...req.body };
        }
        return item;
    });
    summary = helper.getCartSummary(cart);
    res.send({ cart: cart, summary: summary });
})

app.delete('/removeItem', (req, res, next) => {
    cart = cart.filter((item) => item.product_id.toString() !== req.body.product_id.toString());
    summary = helper.getCartSummary(cart);
    res.send({ cart: cart, summary: summary });
})

app.delete('/removeAllItems', (req, res, next) => {
    cart = []
    summary = helper.getCartSummary(cart);
    res.send({ cart: cart, summary: summary });
})

app.put('/updateShippingInfo', (req, res, next) => {
    shippingInfo = { ...req.body };
    res.send('success');
})
