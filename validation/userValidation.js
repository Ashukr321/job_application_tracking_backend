import Joi from 'joi';

export const userRegistrationValidation = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 50 characters',
            'string.empty': 'Name is required'
        }),
    
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required'
        }),
    
    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password cannot exceed 30 characters',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            'string.empty': 'Password is required'
        })
});

export const userLoginValidation = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required'
        }),
    
    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Password is required'
        })
});