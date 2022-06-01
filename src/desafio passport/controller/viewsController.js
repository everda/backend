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
        res.render('home.handlebars')
    } catch (error) {
        console.log(error);
    }
}

let getErrorPage = async (req, res) => {
    try {
        console.log("entre a error");
        res.render('error.handlebars')
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
    getErrorPage, getLogOutPage

}