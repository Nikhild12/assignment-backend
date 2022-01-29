const express = require('express');
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.post("/signup",UserController.createUser);

router.post("/login",UserController.userLogin);

router.get('',checkAuth,UserController.getAllUsers);

router.get('/:id',checkAuth,UserController.getUserById);

router.delete('/:id',checkAuth,UserController.deleteUserById);

router.put('/:id',checkAuth,UserController.updateUserById);

module.exports = router;
