const express = require('express');
const User = require('../../models/userModel');
const Admin = require('../../models/adminModel');
const taskController = require('../../controllers/taskController');
const adminController = require('../../controllers/adminController');
const jwtAuthService = require('../../services/jwtAuthService');
const sanitizeData = require('../../utils/sanitizeData')



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

router.post('/task/createTask',
    sanitizeData('createTask'),
    jwtAuthService.protect(Admin, ['admin']),
    jwtAuthService.restrictTo('admin'),
    taskController.createTask);

router.patch('/updateTask/:taskId',
    sanitizeData('updateTask'),
    jwtAuthService.protect(Admin, ['admin']),
    jwtAuthService.restrictTo('admin'),
    taskController.updateTask);

router.get('/tasks',
    jwtAuthService.protect(Admin, ['admin']),
    jwtAuthService.restrictTo('admin'),
    taskController.getUserTasks);


module.exports = router;
