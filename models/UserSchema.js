const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        batch: {
            type: Number,
            required: true
        },
        activeMonth: {
            type: Number,
            required: true
        },
        activeYear: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const User = new mongoose.model("User", UserSchema);

module.exports = User;