// const userService = require('../services/userService.js')


// //const userInstance = new userService()



// let loginUser = async (req, res, next) => {
//     try {
//         req.session.email = req.body.email;
//         let response = await userInstance.validateLogin(req.body.email, req.body.password)
//         console.log(response);
//         res.send(response)
//     } catch (error) {
//         console.log(error);
//     }
// }

// let registerUser = async (req, res, next) => {
//     try {
//         //console.log(req.body);
//         let data = { username: req.body.user, name: req.body.name, lastname: req.body.lastname, password: req.body.pass }
//         let response = await userInstance.registerUser(data)
//         res.send(response)
//     } catch (error) {
//         console.log(error);

//     }
// }

// let logOutUser = async (req, res, next) => {
//     try {
//         console.log("entre a logout");
//         req.session.destroy()
//         res.redirect('/login')
//     } catch (error) {

//     }
// }


// let isLogin = (req, res, next) => {
//     try {
//         if (req.session.email) {
//             next();
//         } else {
//             res.redirect("/error");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// let isNotLogin = (req, res, next) => {
//     try {
//         if (!req.session.email) {
//             next();
//         } else {
//             res.redirect("/home");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// module.exports = {
//     loginUser, registerUser, logOutUser,isLogin,isNotLogin
// }