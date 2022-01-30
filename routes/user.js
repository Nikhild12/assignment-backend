const express = require('express');
const AuthController = require('../controllers/auth');
const UserController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.post("/signup", AuthController.createUser);

router.post("/login", AuthController.userLogin);

router.get('', checkAuth, UserController.getAllUsers);

router.delete('',  UserController.deleteAllUsers);

router.post('/createUser', checkAuth, UserController.createUser);

router.get('/:id',checkAuth, UserController.getUserById);

router.delete('/:id',checkAuth, UserController.deleteUserById);

router.put('/:id',checkAuth, UserController.updateUserById);

module.exports = router;
