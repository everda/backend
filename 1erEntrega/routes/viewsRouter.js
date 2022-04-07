import express from "express";

const Router = express.Router();

Router.get('/', (req, res) => { res.render('home.handlebars') });

export default Router;
