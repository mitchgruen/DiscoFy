const User = require('../model/userModel');

const UserController = {};


UserController.createUser = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.username || !body.password) {
      throw{
        status: 400,
        message: 'Missing username or password in request body',
      };
    }
    const response = await User.create({
      username: body.username,
      password: body.password,
    })
    
    res.locals.newUser = response;
    return next();
  } catch (e) {
    return next(e);
  }
}

UserController.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.params.user})
    res.locals.findUser = user;
    return next();
    }
  catch (err) {
    return next(err);
  }
}

UserController.updateUser = async (req, res, next) => {

  try {
    const user = await User.findOneAndUpdate({username: req.params.user}, {username: req.body.username}, {new: true});
    res.locals.update = user;
    return next();
  }
  catch (err) {
    return next(err);
  }
}

UserController.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({username: req.params.user});
    res.locals.delete = user;
    return next();
  }
  catch (err) {
    return next(err);
  }
}
module.exports = UserController;
