const express = require("express");
const eventController = require("../controller/EventController");
const eventRouter = express.Router();

//save event in database
eventRouter.post("/", eventController.saveEvent, (req, res) => {
  res.status(200).json(res.locals.savedEvent);
});

// grab event from database
eventRouter.get("/:event", eventController.getEvents, (req, res) => {
  res.status(200).json(res.locals.events);
});

// save a new user in database
eventRouter.post("/", eventController.addPerson, (req, res) => {
  res.status(200).json(res.locals.added);
});

module.exports = eventRouter;
