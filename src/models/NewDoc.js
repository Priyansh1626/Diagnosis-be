const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const DocSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        min: [3, "Name must contain 3 letters"]
    },
    lname: {
        type: String,
        required: true,
        min: [3, "Name must contain 3 letters"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is already present"],
        validate(v) {
            if (!validator.isEmail(v)) {
                throw new Error("Invalid Email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        min: [5, "min length 5 required"]
    },
    fromGoogle: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
        },
        date: {
            type: String,
            default: function () {
                const timeElapsed = Date.now()
                const today = new Date(timeElapsed);
                return today.toUTCString();
            }
        }
    }],
    pic: {
        type: String
    },
    location: [{
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
        coordinates: {
            type: { type: String, enum: ['Point'] },
            coordinates: [Number]
          }
    }],
    qualifications: {
        type: String,
        required: true,
        min: [5, "min length 5 required"]
    },
    department: {
        type: String,
        required: true,
        min: [5, "min length 5 required"]
    },
    patients: [{
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DiagnosisUser",
        },
        date: {
            type: String,
            default: function () {
                const timeElapsed = Date.now()
                const today = new Date(timeElapsed);
                return today.toUTCString();
            }
        }
    }],
    verified: {
        type: Boolean,
        default: false
    },
    registrationNumber: {
        type: Number,
        default: 0
    },
    yearOfRegistration: {
        type: Number,
        default: 0
    },
    medicalCouncil: {
        type: String,
        required: false,
    },
    isAvailable: {
        Type: Boolean,
        default: false,
    },
    popularity: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    // date: {
    //     type: String,
    //     default: function () {
    //         const timeElapsed = Date.now()
    //         const today = new Date(timeElapsed);
    //         return today.toUTCString();
    //     }
    // },
},
    {
        timestamps: true,
    });

DocSchema.methods.generateAuthToken = async function () {
    try {
        const user = this
        const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);
        user.tokens = user.tokens.concat({ token })
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

// securing password
DocSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const DiagnosisDoc = new mongoose.model("Doctor", DocSchema);

module.exports = DiagnosisDoc;