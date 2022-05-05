const joi = require('joi');

let nombre = joi.string().min(3).max(30).required();
let apellido = joi.string().min(3).max(30).required();
let email = joi.string().email().required();
let password = joi.string().min(6).max(30).required();
let password2 = joi.string().min(6).max(30).required();
let avatar = joi.string().required();
let dni = joi.string().required();

const usersSchema = {
    nombre,
    apellido,
    dni
}


module.exports = {
    usersSchema
}