const { check, validationResult } = require('express-validator');

const sanitizeAppointmentData = [
  
  // Sanitize and validate 'name'
  check('name')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Name is required'),

  // Sanitize and validate 'price'
  check('price')
    .trim()
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number'),

  // Sanitize and validate 'pickupLocation'
  check('appointmentLocation')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('appointment Location is required'),

  // Sanitize and validate 'minDays' in duration
  check('duration.minDays')
    .isInt({ min: 1 })
    .withMessage('Minimum days must be at least 1'),

  // Sanitize and validate 'maxDays' in duration, ensuring it is >= minDays
  check('duration.maxDays')
    .isInt({ min: 1 })
    .custom((value, { req }) => value >= req.body.duration.minDays)
    .withMessage('Max days must be greater than or equal to min days'),

  // Sanitize and validate 'requiredDocuments' (array of file names)
  // check('requiredDocuments.*')
  //   .trim()
  //   .escape()
  //   // .matches(/\.(jpg|jpeg|png|pdf)$/i)
  //   .withMessage('Each document must be an image (jpg, jpeg, png) or a PDF'),

  // Handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = sanitizeAppointmentData;
