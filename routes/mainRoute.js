const express = require('express');
const router = express.Router();
const view_user = require('./user/view')
const view_admin = require('./admin/view')


router.use('/user',view_user)
router.use('/admin',view_admin)



module.exports = router;
