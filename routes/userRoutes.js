const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/saveUser', controller.saveUser);
router.get('/getUser/:deviceId', controller.getUser);
router.put('/updateUser/:deviceId', controller.updateUser);
router.delete('/deleteUser/:deviceId', controller.deleteUser);
router.get('/getAllUsers', controller.getAllUsers);

module.exports = router;