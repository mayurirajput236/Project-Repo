const Joi = require('joi');


const signupSchema = Joi.object({
    name: Joi.string()
        .min(5)
     
        .required()
        .messages({
            'string.base': "user name should be string",
            'string.min': "username should have minimum length of 5",
            'string.max': "username should have maximum length of 10",
            'any.required': 'username is a required field'
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Please enter a valid email address.'}),
    password: Joi.string()
        .min(6)
        .max(10)
        .required()
        .messages({
            'string.base': 'Password must be a string.',
            'string.min': 'Password must be at least 6 characters long.',
            'string.max': 'Password must be no more than 10 characters long.',
            'any.required': 'Password is required.'
        })
});


const loginSchema = Joi.object({

    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address.'}),
    password: Joi.string()
        .min(6)
        .max(10)
        .required()
        .messages({
            'string.base': 'Password must be a string.',
            'string.min': 'Password must be at least 6 characters long.',
            'string.max': 'Password must be no more than 10 characters long.',
            'any.required': 'Password is required.'

        })

});

// Export the schemas
module.exports = {
    signupSchema,
    loginSchema
};