const options = {
    "caseSentitive":false,
    "strict":false
  };
  
  const express = require('express');
  const path = require("path");
  const db = require('./repo/category_repo')
  const cateRoute = express.Router(options);
  
  
  
  cateRoute.get('/',db.getCategory);
  cateRoute.get('/:id',db.getCategoryById);
  cateRoute.post('/',db.createCategory);
  cateRoute.put('/:id',db.updateCategory);
  cateRoute.delete('/:id',db.deleteCategory);
  
  module.exports = cateRoute;
  