const express = require('Express');
const UserController = require('../controllers/user');
const router = express.Router();

router.post("/signup",UserController.createUser);

router.post("/login",UserController.userLogin);

router.get('',UserController.getAllUsers);

router.get('/:id',UserController.getUserById);

router.delete('/:id',UserController.deleteUserById);

router.put('/:id',UserController.updateUserById);

module.exports = router;
