const exppress = require('express')
//const loginController = require('../components/login/controller/loginController.js')
let passportController = require('../components/login/controller/passportController.js')
let { passport } = require('../components/login/controller/passportController.js')
// const LocalStrategy = require('passport-local').Strategy


// passport.use('login', new LocalStrategy(async (username, password, done) => {
//     try {
//         console.log("entro");
//         let response = await userInstance.validateLogin(username, password)
//         if (response.status === "ok") {
//             return done(null, username)
//         } else {
//             return done(null, false)
//         }


//     } catch (error) {
//         console.log(error);
//     }
// }))

// passport.use('register', new LocalStrategy({
//     passReqToCallback: true
// }, async (req, username, password, done) => {
//     try {
//         let data = { email: req.body.user, name: req.body.name, lastname: req.body.lastname, pass: req.body.pass }
//         let checkUser = await userInstance.getUsername(data.email)
//         if (checkUser) {
//             return done("User already exists!")
//         } else {
//             let response = await userInstance.registerUser(data)
//             return done(null, reponse)
//         }
//     } catch (error) {

//     }

// }))

// passport.serializeUser((user, done) => {
//     console.log("entro a serialize");
//     done(null, user.email);
// });

// passport.deserializeUser(async (username, done) => {
//     console.log("entro a de serialize");
//     let user = await userInstance.getUsername(username)
//     if (reponse) {
//         done(null, user);
//     }
// });



let loginRouter = exppress.Router()

// loginRouter.post('/login', loginController.loginUser);
// loginRouter.post('/register', loginController.registerUser);
// loginRouter.use('/logOut', loginController.logOutUser);


loginRouter.post('/login', passport.authenticate('login', { failureRedirect: "error", successRedirect: "home" }) );
loginRouter.post('/register', passport.authenticate('register', { failureRedirect: "error", successRedirect: "login", failureMessage:"error al verificar"}));
loginRouter.use('/logOut', passportController.logOutUser);



//loginRouter.post('/register', passport.authenticate('register', { failureRedirect: "home", successRedirect: "homeS" }));



module.exports = loginRouter
