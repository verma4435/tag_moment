const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
    },
    city: {
        type: String
    }
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;