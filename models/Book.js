const mongoose = require('mongoose');

const schema = mongoose.Schema({
    id: { type: String, unique: true },
    name: String, count: Number, image: String
});

module.exports = mongoose.model('Book', schema);
