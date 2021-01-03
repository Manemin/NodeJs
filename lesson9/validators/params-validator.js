const Joi = require('joi');

const { EMAIL } = require('../constants/regex');

module.exports = Joi.object({
    userId: Joi.number().integer().min(1),
    name: Joi.string().alphanum().min(1),
    email: Joi.string().regex(EMAIL),
});
