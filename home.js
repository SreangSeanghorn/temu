const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
var cookieParser = require("cookie-parser");
//const api = require('./api/index.js');

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
//app.use('/index', api)

let summary = {
    total: 34.53,
    tax: 4.56,
    discount: 4.54,
    estTotal: 30.45,
    itemAmounts: 8
}

app.get('/header', (req, res, next) => {
    res.render('header', { summary: summary })
})

app.get('/homePage',(req,res,next)=>{
  res.sendFile(path.join(__dirname,'views/home_page.html'))
})


// app.get('/footer', (req, res, next) => {
//     res.sendFile(path.join(__dirname, '..', 'views', "footer.html"));
// })

app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'index.html'))
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

var prodRoute = require('./api/product')
var cateRoute = require('./api/category')
var supRoute = require('./api/supplier')
app.use('/product', prodRoute)
app.use('/category', cateRoute)
app.use('/supplier', supRoute)  