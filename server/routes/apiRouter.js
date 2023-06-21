const express = require("express");
const apiController = require("../controller/apiController");
const apiRouter = express.Router();

apiRouter.post("/", apiController.getResponse, (req, res) => {
  res.status(200).json(res.locals.gpt);
});

// apiRouter.get("/", apiController.getApi, (req, res) => {
//   res.status(200).json(res.locals.messages);
// });

module.exports = apiRouter;

