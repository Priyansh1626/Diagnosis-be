const mongoose = require("mongoose");
const schema = {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
    },
    diagnosis: [{
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "",
        },
        result: [{
            problem: {
                type: String,
            },
            medPrefered: [
                {
                    type: String
                }
            ]
        }]
    }],
}

const diagnosedSchema = new mongoose.Schema(schema);
const diagnosed = new mongoose.model("Diagnosed", diagnosedSchema);
module.exports = diagnosed;