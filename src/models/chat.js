const mongoose = require('mongoose');
const schema = {
    chatName: {
        type: String,
        trim: true,
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    }],
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
    },
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
}

const chatSchema = mongoose.Schema(schema, {
    timestamps: true,
})

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;