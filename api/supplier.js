
const options = {
    "caseSentitive":false,
    "strict":false
  };
  
  const express = require('express');
  const path = require("path");
  const db = require('./repo/supplier_repo')
  
  const supRoute = express.Router(options);
  
  supRoute.get('/',db.getSupplier);
  supRoute.post('/',db.createSupplier);
  supRoute.get('/:id',db.getSupplierById);
  supRoute.put('/updateName/:id',db.updateSupplierName);
  supRoute.put('/updateRate/:id',db.updateSupplierRate);
  
  
  
  module.exports = supRoute;
  
  