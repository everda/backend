const { async } = require("rxjs");


let getLoginPage = async (req, res) => {
    try {
        res.render('login.handlebars', {title: 'Login Ecommerce'})
    } catch (error) {
        console.log(error);
    }

}


let getRegisterPage = async (req, res) => {
    try {
        res.render('register.handlebars', {title: 'Register Ecommerce'})
    } catch (error) {
        console.log(error);
    }
}


let getHomePage = async (req, res) => {
    try {
        console.log("entre a home");
        console.log(req);
        res.render('home.handlebars', {username: req.user , title:'home'})
    } catch (error) {
        console.log(error);
    }
}

let getErrorLoginPage = async (req, res) => {
    try {
        console.log("entre a error");
        res.render('loginError.handlebars', {title: 'error page login'})
    } catch (error) {
        console.log(error);

    }
}

let getErrorRegisterPage = async (req, res) => {
    try {
        console.log("entre a error");
        res.render('registerError.handlebars', {title: 'error page Registration'})
    } catch (error) {
        console.log(error);

    }
}

let getLogOutPage = async (req, res) => {
    try {
        res.render('logout.handlebars', {title: 'Goodbye'})
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getLoginPage,
    getRegisterPage,
    getHomePage,
    getErrorLoginPage, getLogOutPage, getErrorRegisterPage

}