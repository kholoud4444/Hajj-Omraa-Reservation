const express = require('express');
const UserCtrl = require('../controllers/user-ctrl');
const router = express.Router();

router.post('/user/auth', UserCtrl.checkUserAuth);
router.get('/', UserCtrl.checkServiceRunning);
router.post('/register', UserCtrl.registerUser);

module.exports = router;