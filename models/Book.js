import mongoose from 'mongoose'

const schema = mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  count: Number,
  image: String
})

export default mongoose.model('Book', schema)
