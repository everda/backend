const express = require("express");
const productController = require("../controllers/productController.js");

const productRouter = express.Router();

productRouter.get("/", productController.getPorudctsTest);



module.exports = productRouter;
