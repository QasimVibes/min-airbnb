import { body, validationResult } from 'express-validator'

const validateCreateUser = [
    body('userName').notEmpty().withMessage('User name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
]

const validateLoginUser = [
    body('email').notEmpty().withMessage('Email is required') ,
    body('password').notEmpty().withMessage('Password is required')
]

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export { handleValidationErrors, validateCreateUser, validateLoginUser }