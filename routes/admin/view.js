const express = require('express');
const visaController = require('../../controllers/visaController');
const adminController = require('../../controllers/adminController');
const jwtAuthService = require('../../services/jwtAuthService');
const sanitizeVisaData = require('../../middlewares/visa/sanitizeVisaData')
const sanitizePickupData = require('../../middlewares/pickup/sanitizePickupData')
const sanitizeAppointmentData = require('../../middlewares/appointment/sanitizeAppointmentData')
const router = express.Router();
// const sanitizeVerificationCode  = require('../../middlewares/userMiddlewares/sanitizeVerificationCode');

router.post('/signup',
    jwtAuthService.protect,
    adminController.adminSignUp);


router.get('/visa/findCountry',
    jwtAuthService.protect,
    jwtAuthService.restrictTo('admin'),
    visaController.findCountry
);

router.post('/visa/setVisaKind',
    jwtAuthService.protect,
    jwtAuthService.restrictTo('admin'),
    visaController.setVisaKind
);

router.post('/visa/createVisa',
    sanitizeVisaData,
    jwtAuthService.protect,
    jwtAuthService.restrictTo('admin'),
    visaController.createVisa
);
router.post('/visa/createPickup',
    sanitizePickupData,
    jwtAuthService.protect,
    jwtAuthService.restrictTo('admin'),
    visaController.createPickup
);

router.post('/visa/createAppointment',
    sanitizeAppointmentData,
    jwtAuthService.protect,
    jwtAuthService.restrictTo('admin'),
    visaController.createAppointment
);

router.post('/visa/visaOrdering',
    
    jwtAuthService.protect,
    jwtAuthService.restrictTo('admin'),
    visaController.visaOrdering
);


// router.post('/createProfile',
//     jwtAuthService.protect,
//     userController.createProfile);

module.exports = router;
