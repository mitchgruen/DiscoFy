const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const ApiSchema = new Schema({
  messages: {type: String}
})

module.exports = mongoose.model('ApiSchema', ApiSchema);