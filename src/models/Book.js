import mongoose from 'mongoose'

const schema = mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  count: Number,
  totalWords: Number,
  image: String // base64 encoded
})

export default mongoose.model('Book', schema)
