const mongoose = require('mongoose');
const schema = {
    service: [{
        country: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
    }
    ]
}

const servicesSchema = mongoose.Schema(schema, {
    timestamps: true,
})

const services = mongoose.model('Service', servicesSchema);

module.exports = services;