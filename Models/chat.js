// this file contains the model, schema for oue chat collection.
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from:{
        type:String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    msg:{
        type: String,
        maxLength: 50
    },
    createdAt: {
        type: Date
    }
})

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;