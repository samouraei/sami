const express = require('express');
const visaController = require('../../controllers/visaController');
const adminController = require('../../controllers/adminController');
const jwtAuthService = require('../../services/jwtAuthService');
const sanitizeData = require('../../middlewares/sanitizeData')



const router = express.Router();

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
    sanitizeData('createAppointment'),
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
