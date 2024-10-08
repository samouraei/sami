const express = require('express');
const User = require('../../models/userModel');
const Admin = require('../../models/adminModel');
const visaController = require('../../controllers/visaController');
const adminController = require('../../controllers/adminController');
const jwtAuthService = require('../../services/jwtAuthService');
const sanitizeData = require('../../middlewares/sanitizeData')



const router = express.Router();

router.post('/signup',
    sanitizeData('email'),
    sanitizeData('password'),
    adminController.adminSignUp);


router.get('/verification/:token',
    // sanitizeData('emailVerificationToken'),
    adminController.adminVerification);

router.post('/login',
    sanitizeData('email'),
    sanitizeData('password'),
        adminController.adminLogin);

router.get('/forgotPassword',
    sanitizeData('email'),
    adminController.adminForgotPassword);

router.patch('/resetPassword/:token',
    adminController.adminResetPassword);

router.get('/visa/findCountry',
    jwtAuthService.protect(Admin, ['admin']),
    jwtAuthService.restrictTo('admin'),
    visaController.findCountry
);

router.post('/visa/setVisaKind',
    jwtAuthService.protect(Admin, ['admin']),
    jwtAuthService.restrictTo('admin'),
    visaController.setVisaKind
);

router.post('/visa/createVisa',
    sanitizeData('createVisa'),
    jwtAuthService.protect(Admin, ['admin']),
    jwtAuthService.restrictTo('admin'),
    visaController.createVisa
);
router.post('/visa/createPickup',
    sanitizeData('createPickup'),
    jwtAuthService.protect(Admin, ['admin']),
    jwtAuthService.restrictTo('admin'),
    visaController.createPickup
);

router.post('/visa/createAppointment',
    sanitizeData('phoneNumber'),
    sanitizeData('createAppointment'),
    jwtAuthService.protect(Admin, ['admin']),
    jwtAuthService.restrictTo('admin'),
    visaController.createAppointment
);

router.post('/visa/visaOrdering',
    sanitizeData('visaOrdering'),
    jwtAuthService.protect(Admin, ['admin']),
    jwtAuthService.restrictTo('admin'),
    visaController.visaOrdering
);


// router.post('/createProfile',
//     jwtAuthService.protect,
//     userController.createProfile);

module.exports = router;
