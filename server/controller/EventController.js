const eventController = {};

eventController.saveEvent = async (req, res, next) => {
  const { event, location, summary, time, name, email } = req.body;
  const savedEvent = await Event.create({
    event: event,
    location: location,
    summary: summary,
    time: time,
    name: name,
    emails: email,
  });
  console.log(savedEvent);
  return next();
};

eventController.getEvents = async (req, res, next) => {
  const { email } = req.body;
  const events = await Event.find({ emails: email });
  console.log(events);
  return next();
};

eventController.addPerson = async (req, res, next) => {
  const { event, email } = req.body;
  const added = await Event.findOne(
    { event: event },
    { $push: { email: email } }
  );
};

module.exports = EventController;
