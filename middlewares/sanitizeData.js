const { check, body, validationResult } = require('express-validator');

// Common validation functions
const validateName = check('name').trim().escape().notEmpty().withMessage('Name is required')
                    .isLength({ max: 30 }).withMessage('Name cannot be more than 30 characters long');
const validateFname = check('firstName').trim().escape().notEmpty().withMessage('first Name is required')
                    .isLength({ max: 30 }).withMessage('Name cannot be more than 30 characters long');
const validateLname = check('lastName').trim().escape().notEmpty().withMessage('Name is required')
                    .isLength({ max: 30 }).withMessage('Name cannot be more than 30 characters long');
const validateBirthday = check('birthday').isISO8601().toDate().withMessage('birthday date must be a valid date');
const validatePassportExpirationDate = check('passportExpirationDate').isISO8601()
                                      .toDate().withMessage('passport Expiration Date date must be a valid date');


const validatePrice = check('price').trim().isFloat({ min: 0 }).withMessage('Price must be a non-negative number');

const validateDurationMinDays = check('duration.minDays')
                                .isInt({ min: 1 }).withMessage('Minimum days must be at least 1');

const validateDurationMaxDays = check('duration.maxDays').isInt({ min: 1 })
                                .custom((value, { req }) => value >= req.body.duration.minDays)
                                .withMessage('Max days must be greater than or equal to min days');

const validateDocuments = check('requiredDocuments.*').trim().escape(); // Customize as needed

// Appointment-specific validation
const validateAppointmentLocation = check('appointmentLocation').trim().escape().notEmpty()
                                    .withMessage('Appointment location is required');

// Pickup-specific validation
const validatePickupLocation = check('pickupLocation').trim().escape().notEmpty().withMessage('Pickup location is required');
const validateDropoffLocation = check('dropoffLocation').trim().escape().notEmpty().withMessage('Dropoff location is required');
const validatePickupDate = check('pickupDate').isISO8601().toDate().withMessage('Pickup date must be a valid date');

// Visa-specific validation
const validateVisaType = check('visaType').trim().escape().isIn(['ویزا لیبلی', 'ویزا الکترونیکی', 'ویزا نیاز به مشاوره']).withMessage('Invalid visa type');
const validateValidityPeriod = check('validityPeriod').trim().escape().isInt({ min: 1 }).withMessage('Validity period must be a positive integer');
const validateUrgencyLevel = check('urgencyLevel').trim().escape().isIn(['عادی', 'فوری']).withMessage('Invalid urgency level');
const validateIssuancePeriod = check('issuancePeriod').trim().escape().isInt({ min: 1 }).withMessage('Issuance period must be a positive integer');
const validateCountryId = check('countryId').trim().escape().isMongoId().withMessage('Invalid country reference');


// VisaOrder-specific validation
const validatePaymentKind = check('paymentKind').trim().escape().isIn(['offline', 'online']).withMessage('Invalid payment Kind');

// Phone number validation
const validatePhoneNumber = body('phoneNumber')
  .trim()
  .notEmpty().withMessage('Phone number is required')
  .isString().withMessage('Phone number must be a string')
  .matches(/^09\d{9}$/).withMessage('Phone number must start with "09" and be 11 digits long');


  const validateEmail = body('email')
  .trim() // Remove any leading/trailing whitespace
  .notEmpty().withMessage('Email is required') // Ensure the email field is not empty
  .isString().withMessage('Email must be a string') // Ensure the email is a string
  .isEmail().withMessage('Please provide a valid email') // Validate the email format
  .normalizeEmail(); // Normalize the email address (e.g., removing dots in Gmail addresses)

  const validatePassword = body('password')
  .trim() // Removes leading/trailing spaces
  .notEmpty().withMessage('Password is required') // Ensure password field is not empty
  .isString().withMessage('Password must be a string') // Ensure password is a string
  .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long') // Minimum length requirement
  .matches(/\d/).withMessage('Password must contain at least one number') // At least one number
  .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter') // At least one uppercase letter
  .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter') // At least one lowercase letter
  .matches(/[@$!%*?&#]/).withMessage('Password must contain at least one special character (@$!%*?&#)') // Special character requirement
  .not().isIn(['12345678', 'password', 'qwerty', 'admin', 'letmein']).withMessage('Do not use a common password'); // Prevent common passwords


// Verification code validation
const validateVerificationCode = body('verificationCode')
  .trim()
  .notEmpty().withMessage('Verification code is required')
  .isNumeric().withMessage('Verification code must be a numeric value')
  .isLength({ min: 6, max: 6 }).withMessage('Verification code must be exactly 6 digits long');
  const emailVerificationToken = body('token')
        .exists()
        .withMessage('Token is required.')
        .isString()
        .withMessage('Token must be a string.')
        .isLength({ min: 10, max: 100 }) // Adjust the length based on your token requirements
        .withMessage('Token must be between 10 and 100 characters long.')

// Centralized validation handler
const handleValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Centralized sanitize middleware factory
const sanitizeData = (schema) => {
  let validations = [];

  switch (schema) {
    case 'createAppointment':
      validations = [
        validateName,
        validatePrice,
        validateAppointmentLocation,
        validateDurationMinDays,
        validateDurationMaxDays,
        validateDocuments,
      ];
      break;

    case 'createPickup':
      validations = [
        validateName,
        validatePrice,
        validatePickupLocation,
        validateDropoffLocation,
        validateDurationMinDays,
        validateDurationMaxDays,
        validatePickupDate,
        validateDocuments,
      ];
      break;

    case 'createVisa':
      validations = [
        validateVisaType,
        validateValidityPeriod,
        validateUrgencyLevel,
        validateIssuancePeriod,
        validateCountryId,
      ];
      break;

      case 'visaOrdering':
      validations = [
        validateFname,
        validateLname,
        validateBirthday,
        validatePassportExpirationDate,
        validatePrice,
        validatePaymentKind
      ];
      break;

    case 'phoneNumber':
      validations = [validatePhoneNumber];
      break;

      case 'email':
      validations = [validateEmail];
      break;

      case 'emailVerificationToken':
        validations = [emailVerificationToken];
        break;
      case 'password':
      validations = [validatePassword];
      break;

    case 'verificationCode':
      validations = [validateVerificationCode];
      break;

    default:
      throw new Error('Invalid schema type');
  }

  return [...validations, handleValidationResult];
};

module.exports = sanitizeData;
