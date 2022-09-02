const JWT = require('jsonwebtoken')
const winston = require('../loggers/winston')
const config = require('../../config/index')
const { sendCart } = require('../../components/cart/services/DTO')

const generateToken = async (user) => {
    let payload = {
        user: user,
        timestamp: Date.now()
    }
    let options = { expiresIn: "2h" }
    return JWT.sign(payload, config.private_key, options)

}

const refreshToken = async (user) => {
    let payload = {
        user: user,
        timestamp: Date.now()
    }
    let options = { expiresIn: "1y" }
    return JWT.sign(payload, config.refresh_private_key, options)

}


const Islogged = async (req, res, next) => {
    try {
        if (req.cookies.token) {
            let response = await validateToken(req.cookies.token)
            if (response) {
                res.redirect('/home')
            }
        }
        else {
            if (req.cookies.refreshToken) {
                let response  = refreshToken)
                res.redirect('/home')
            }
            else {
                res.redirect('/login')
            }
        }

    } catch (error) {

    }


}

const IsNotlogged = async (req, res, next) => {
    try {
        if (req.cookies.token) {
            let response = await validateToken(req.cookies.token)
            if (response) {
                next()
            }

        }
        else {
            res.redirect('/login')
        }

    } catch (error) {

    }


}

const validateToken = async (token) => {
    try {
        //if (req.headers['authorization']) {
        // let authHeader = req.headers['authorization']
        // let bearerToken = authHeader.split(' ')
        //let token = bearerToken[1]
        JWT.verify(token, config.private_key);
        return true
    } catch (error) {
        return false
    }
}

module.exports = {
    generateToken,
    validateToken
}