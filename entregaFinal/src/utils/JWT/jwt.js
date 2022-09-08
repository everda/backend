const JWT = require('jsonwebtoken')
const winston = require('../loggers/winston')
const config = require('../../config/index')
const { sendCart } = require('../../components/cart/services/DTO')

const generateToken = async (user) => {
    let payload = {
        user: user,
        timestamp: Date.now()
    }
    let options = { expiresIn: config.session_time }
    let token = JWT.sign(payload, config.private_key, options)

    return token

}

const generateRefreshToken = async (user) => {
    let refreshPayload = {
        user: user,
        timestamp: Date.now()
    }
    let refreshOptions = {
        expiresIn: "1y",
        audience: user
    }
    let refreshToken = JWT.sign(refreshPayload, config.refresh_private_key, refreshOptions)
    return refreshToken
}


const validateToken = async (token) => {
    try {

        //if (req.headers['authorization']) {
        // let authHeader = req.headers['authorization']
        // let bearerToken = authHeader.split(' ')
        //let token = bearerToken[1]
        let response = JWT.verify(token, config.private_key);
        //console.log(response);
        return { status: "success", user: response.user }

    } catch (error) {
        return { status: "error", message: error }
    }
}


// const verifyRefreshToken = async (refreshedToken) => {
//     try {
//         //if (req.headers['authorization']) {
//         // let authHeader = req.headers['authorization']
//         // let bearerToken = authHeader.split(' ')
//         //let token = bearerToken[1]
//         let result = JWT.verify(refreshedToken, config.refresh_private_key);


//         return true
//     } catch (error) {
//         return false
//     }
// }

const Islogged = async (req, res, next) => {
    try {
        if (req.cookies.token) {
            let response = await validateToken(req.cookies.token)
            if (response.status === "success") {
                req.user = response.user.user
                let newToken = await generateToken(req.user)
                res.cookie('token', newToken)
                res.redirect('/home')
            }
            else { next() }
        }
        else {
            next()
        }
    } catch (error) {
        winston.errorLogger(error)
    }


}

const IsNotlogged = async (req, res, next) => {
    try {
        if (req.cookies.token) {
            let response = await validateToken(req.cookies.token)
            if (response.status === "success") {
                req.user = response.user
                let newToken = await generateToken(req.user)
                res.cookie('token', newToken)
                next()
            }
            else { res.redirect('/login') }
        }
        else {
            res.redirect('/login')
        }
    } catch (error) {
        


    }
}
module.exports = {
    generateToken,
    generateRefreshToken,
    Islogged,
    IsNotlogged
}