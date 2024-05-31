const mongoose = require("mongoose");
const schema = {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Client",
      },
      token: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600,// this is the expiry time in seconds
      },
}

const tokenSchema = new mongoose.Schema(schema);
const token = new mongoose.model("Token", tokenSchema);
module.exports = token;