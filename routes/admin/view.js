const express = require('express');
const visaController = require('../../controllers/visaController');
const jwtAuthService = require('../../services/jwtAuthService');
const sanitizeVisaData = require('../../middlewares/visa/sanitizeVisaData')
const router = express.Router();
// const sanitizeVerificationCode  = require('../../middlewares/userMiddlewares/sanitizeVerificationCode');


router.get('/visa/findCountry',
    jwtAuthService.protect,
    jwtAuthService.restrictTo('user'),
    visaController.findCountry
);

router.post('/visa/setVisaKind',
    jwtAuthService.protect,
    jwtAuthService.restrictTo('user'),
    visaController.setVisaKind
);

router.post('/visa/createVisa',
    sanitizeVisaData,
    jwtAuthService.protect,
    jwtAuthService.restrictTo('user'),
    visaController.createVisa
);


// router.post('/createProfile',
//     jwtAuthService.protect,
//     userController.createProfile);

module.exports = router;
