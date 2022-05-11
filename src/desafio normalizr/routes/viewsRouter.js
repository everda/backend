const express = require("express");
const viewsRouter = express.Router();
const viewController = require("../controllers/viewController.js");

viewsRouter.get("/",
    viewController.getHomePage);


viewsRouter.get("/productsTest",
    viewController.getProductsTest);

viewsRouter.get("/chat", viewController.getChatPage);


module.exports = viewsRouter;