const { body, validationResult } = require('express-validator');

// Function to validate and sanitize verification code
const sanitizeVerificationCode = [
    body('verificationCode')
        .trim()
        .notEmpty().withMessage('Verification code is required')
        .isNumeric().withMessage('Verification code must be a numeric value')
        .isLength({ min: 6, max: 6 }).withMessage('Verification code must be exactly 6 digits long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = sanitizeVerificationCode;
