const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  event: { type: String },
  location: { type: String },
  time: { type: String },
  summary: { type: String },
  name: { type: String },
  email: { type: String }
  // emails: [],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = {
  Event,
};
