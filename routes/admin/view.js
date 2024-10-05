const express = require('express');
// const {emailVerificationService} = require('../../services/emailVerificationService');
const visaController = require('../../controllers/visaController');
const adminController = require('../../controllers/adminController');
const jwtAuthService = require('../../services/jwtAuthService');
const sanitizeData = require('../../middlewares/sanitizeData')



const router = express.Router();

router.post('/signup',
    adminController.adminSignUp);


router.get('/verification/:token',
    adminController.adminVerification);

router.post('/login',
        adminController.adminLogin);

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
    sanitizeData('createVisa'),
    jwtAuthService.protect,
    jwtAuthService.restrictTo('admin'),
    visaController.createVisa
);
router.post('/visa/createPickup',
    sanitizeData('createPickup'),
    jwtAuthService.protect,
    jwtAuthService.restrictTo('admin'),
    visaController.createPickup
);

router.post('/visa/createAppointment',
    sanitizeData('phoneNumber'),
    sanitizeData('createAppointment'),
    jwtAuthService.protect,
    jwtAuthService.restrictTo('admin'),
    visaController.createAppointment
);

router.post('/visa/visaOrdering',
    sanitizeData('visaOrdering'),
    jwtAuthService.protect,
    jwtAuthService.restrictTo('admin'),
    visaController.visaOrdering
);


// router.post('/createProfile',
//     jwtAuthService.protect,
//     userController.createProfile);

module.exports = router;
