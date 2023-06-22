const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const EventSchema = new Schema({
  event: { type: String },
  location: { type: String },
  time: { type: String },
  summary: { type: Number },
  name: { type: String },
  emails: [],
});

module.exports = mongoose.model("EventSchema", EventSchema);
