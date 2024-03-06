const { Event } = require("../model/eventModel");
const eventController = {};

eventController.saveEvent = async (req, res, next) => {
  const { event, location, summary, time, name, email } = req.body;
  //   console.log(req.body);
  try {
    const savedEvent = await Event.create({
      event: event,
      location: location,
      summary: summary,
      time: time,
      name: name,
      email: email
      // emails: email,
    });
    res.locals.savedEvent = savedEvent;
    console.log(savedEvent);
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

eventController.getEvents = async (req, res, next) => {
  const events = await Event.find({});
  console.log(events);
  res.locals.events = events;
  return next();
};

eventController.addPerson = async (req, res, next) => {
  const { event, email } = req.body;
  const added = await Event.findOne(
    { event: event },
    { $push: { email: email } }
  );
  res.locals.added = added;
  return next();
};

module.exports = eventController;
