const mongoose = require('mongoose');
const schema = {
    serviceName: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },
    serviceid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
    },
    diagnosis: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diagnosed",
    },
    fileimage: [{
        name: {
            type: String,   
        },
        image: {
            data: Buffer,
            contentType: String
        }
    }]
}

const selfServiceSchema = mongoose.Schema(schema, {
    timestamps: true,
})

const selfService = mongoose.model('selfService', selfServiceSchema);

module.exports = selfService;