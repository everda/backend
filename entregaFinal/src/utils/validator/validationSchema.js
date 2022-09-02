const Joi = require('joi')

const authSchema = Joi.object({
    username: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required()
})


const authRegSchema = Joi.object({
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
    direccion: Joi.string().required(),
    edad: Joi.string().required(),
    prefijo: Joi.string().required(),
    numero: Joi.string().required(),
    file: Joi.string().required(),
})


module.exports = {
    authSchema,authRegSchema
}