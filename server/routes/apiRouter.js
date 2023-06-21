const express = require('express');
const apiController = require('../controller/apiController');
const apiRouter = express.Router();

apiRouter.post('/', (req, res) => {
  res.status(200).json(res.locals.ideas);
})

apiRouter.get('/', (req, res) => {
  res.status(200).json(res.locals.messages);
})


module.exports = apiRouter;