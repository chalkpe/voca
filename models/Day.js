const mongoose = require('mongoose');

const schema = mongoose.Schema({
    book: String, id: Number,
    words: [{ id: String, meaning: String, level: Number }]
});

schema.index({ book: 1, id: 1 }, { unique: true });
module.exports = mongoose.model('Day', schema);
