const express = require('express');
const router = express.Router();
const view_user = require('./user/view')
const view_admin = require('./admin/view')

// router.use('/view',view);

router.use('/user',view_user)
router.use('/admin',view_admin)
// router.use('api/v1/web/user/verification',userController.verification)
// router.use('api/v1/web/user/createProfile',jwtAuthService.protect,userController.createProfile)


module.exports = router;
