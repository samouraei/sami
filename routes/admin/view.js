const express = require('express');
const visaController = require('../../controllers/visaController');
const jwtAuthService = require('../../services/jwtAuthService');
const sanitizeVisaData = require('../../middlewares/visa/sanitizeVisaData')
const router = express.Router();
// const sanitizeVerificationCode  = require('../../middlewares/userMiddlewares/sanitizeVerificationCode');



router.post('/visa/createVisa',
    sanitizeVisaData,
    jwtAuthService.protect,
    jwtAuthService.restrictTo('admin'),
    visaController.createVisa
);

// router.post('/verification',
//     sanitizePhoneNumber,
//     sanitizeVerificationCode,
//     userController.verification);


// router.post('/createProfile',
//     jwtAuthService.protect,
//     userController.createProfile);

module.exports = router;
