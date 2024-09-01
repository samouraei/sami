const { check, validationResult } = require('express-validator');
const Country = require('../../models/countryModel');

const sanitizeVisaData = [
  
  check('visaType')
    .trim()
    .escape()
    .isIn(['ویزا لیبلی', 'ویزا الکترونیکی', 'ویزا نیاز به مشاوره'])
    .withMessage('Invalid visa type'),

  // Sanitize and validate 'validityPeriod'
  check('validityPeriod')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Validity period must be a positive integer'),

  // Sanitize and validate 'duration'
  check('duration')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer'),

  // Sanitize and validate 'urgencyLevel'
  check('urgencyLevel')
    .trim()
    .escape()
    .isIn(['عادی', 'فوری'])
    .withMessage('Invalid urgency level'),

  // Sanitize and validate 'issuancePeriod'
  check('issuancePeriod')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Issuance period must be a positive integer'),

  // Sanitize and validate 'refCountry'
  check('countryId')
    .trim()
    .escape()
    .isMongoId()
    .withMessage('Invalid country reference'),

  // Handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = sanitizeVisaData;
