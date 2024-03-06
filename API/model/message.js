const mongoose = require("mongoose");


const MessageSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
        required: true,
        minLength: 1,
    }
});

/*
Static method to retrieve the latest messages from the MongoDB collection. 
The count parameter tells it how many messages to retrieve.
*/
MessageSchema.statics.latest = (count) => {
    return MessageModel.find({}).sort({"_id": "desc"}).limit(count);
};

/*
Static method to create a message and save it to the MongoDB collection.
The content parameter tells it what the message should display.
*/
MessageSchema.statics.create = (content) => {
    let msg = new MessageModel({
        date: new Date(),
        content: content
    });

    return msg.save();
};


const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = {
    Schema: MessageSchema,
    Model: MessageModel
};