const express = require('express');
const userController = require('../../controllers/userController');
const jwtAuthService = require('../../services/jwtAuthService');
const router = express.Router();
const sanitizePhoneNumber = require('../../middlewares/user/sanitizePhoneNumber')
const sanitizeVerificationCode  = require('../../middlewares/user/sanitizeVerificationCode');



router.post('/login',
    sanitizePhoneNumber,
    userController.login);

router.post('/verification',
    sanitizePhoneNumber,
    sanitizeVerificationCode,
    userController.verification);


router.post('/createProfile',
    jwtAuthService.protect,
    userController.createProfile);

module.exports = router;
