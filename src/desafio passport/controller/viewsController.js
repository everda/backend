const { async } = require("rxjs");


let getLoginPage = async (req, res) => {
    try {
        res.render('login.handlebars')
    } catch (error) {
        console.log(error);
    }

}


let getRegisterPage = async (req, res) => {
    try {
        res.render('register.handlebars')
    } catch (error) {
        console.log(error);
    }
}


let getHomePage = async (req, res) => {
    try {
        console.log("entre a home");
        console.log(req);
        res.render('home.handlebars', {username: req.user})
    } catch (error) {
        console.log(error);
    }
}

let getErrorLoginPage = async (req, res) => {
    try {
        console.log("entre a error");
        res.render('loginError.handlebars')
    } catch (error) {
        console.log(error);

    }
}

let getErrorRegisterPage = async (req, res) => {
    try {
        console.log("entre a error");
        res.render('registerError.handlebars')
    } catch (error) {
        console.log(error);

    }
}

let getLogOutPage = async (req, res) => {
    try {
        res.render('logout.handlebars')
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