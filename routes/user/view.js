const express = require('express');
const userController = require('../../controllers/userController');
const jwtAuthService = require('../../services/jwtAuthService');
const router = express.Router();
const sanitizeData = require('../../utils/sanitizeData')




router.post('/login',
    sanitizeData('phoneNumber'),
    userController.login);

router.post('/verification',
    sanitizeData('phoneNumber'),
    sanitizeData('verificationCode'),
    userController.verification);


router.post('/createProfile',
    jwtAuthService.protect,
    userController.createProfile);

module.exports = router;
