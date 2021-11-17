const db = require("../models");
const Product = db.product
const Op = db.Sequelize.Op;

// Retrieve all Product from the database.
exports.findAll = (req, res) => {
  if (!req.query.limitRec){
    limitRec =10;
  }else{
    limitRec = req.query.limitRec
  }
  if (!req.query.skipRec){
    skipRec =0;
  }else{
    skipRec = req.query.skipRec
  }

  Product.findAndCountAll({ offset:parseInt(skipRec), limit:parseInt(limitRec) })
    .then(data => {
      return res.json({status:true, data:data})
    })
    .catch(err => {
      res.status(500).send({
        message:err.message || "Some error occurred while retrieving product."
      });
    });
};
