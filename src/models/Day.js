import mongoose from 'mongoose'

const schema = mongoose.Schema({
  book: String,
  id: Number,
  words: [{ id: String, meaning: String, level: Number }]
})

schema.index({ book: 1, id: 1 }, { unique: true })
export default mongoose.model('Day', schema)
