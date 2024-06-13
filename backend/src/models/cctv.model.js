const mongoose = require('mongoose');
const { Schema } = mongoose;

const cctvSchema = new Schema({
    classs: {
        type: String,
    },
    score: {
        type: String,
    },
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true
});

module.exports = mongoose.model('CCTV', cctvSchema);
