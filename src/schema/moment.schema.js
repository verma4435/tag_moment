const mongoose = require("mongoose");

const momentSchema = new mongoose.Schema({
    comment: {
        type: String,
        require: true,
    },
    tags: [{
        type: String
    }],
    filepath: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true });

const momentModel = mongoose.model('moment', momentSchema);

module.exports = momentModel;