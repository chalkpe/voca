import mongoose from 'mongoose'

const schema = mongoose.Schema({
  username: { type: String, unique: true },

  token: String,
  name: String,
  email: String
})

export default mongoose.model('User', schema)
