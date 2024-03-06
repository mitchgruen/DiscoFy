const express = require('express');
const userController = require('../controller/userController');
const userRouter = express.Router();


//create a user in the database
userRouter.post('/', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.newUser);
})

//grab a user from the database
userRouter.get('/:user', userController.getUser, (req, res) => {
  res.status(200).json(res.locals.findUser);
})

userRouter.patch('/:user', userController.updateUser, (req, res) => {
  res.status(200).json(res.locals.update);
})

userRouter.delete('/:user', userController.deleteUser, (req, res) => {
  res.status(200).json(res.locals.delete);
})
module.exports = userRouter;