const { body, validationResult } = require('express-validator');

// Function to validate and sanitize phone number
const sanitizePhoneNumber = [
    body('phoneNumber')
        .trim() // Remove any leading/trailing spaces
        .notEmpty().withMessage('Phone number is required')
        .isString().withMessage('Phone number must be a string')
        .matches(/^09\d{9}$/).withMessage('Phone number must start with "09" and be 11 digits long')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = sanitizePhoneNumber;
