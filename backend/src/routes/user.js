const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/userController');

router.post('/register', UserController.Register)
router.get('/confirm-account', UserController.confirmAccount)
router.get('/:unique_identifier/showStores', UserController.showStores)

module.exports = router;