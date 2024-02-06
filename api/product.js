
const options = {
  "caseSentitive":false,
  "strict":false
};

const express = require('express');
const path = require("path");
const db = require('./repo/product_repo')

const prRoute = express.Router(options);

prRoute.get('/',db.getProducts);
prRoute.get('/byCategoryId/:id',db.getProductsByCategoryId);
prRoute.post('/',db.createProduct);
prRoute.get('/:id',db.getProductsById)



module.exports = prRoute;

