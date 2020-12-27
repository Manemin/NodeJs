const Joi = require('joi');

const { re: { EMAIL, PASSWORD }, invalidNames } = require('../constants');

module.exports = Joi.object({
    name: Joi
        .string()
        .min(3)
        .max(20)
        .trim()
        .invalid(...invalidNames)
        .required(),
    email: Joi
        .string()
        .regex(EMAIL)
        .required(),
    password: Joi
        .string()
        .regex(PASSWORD)
        .required()
});
