import mongoose from 'mongoose'
import crypto from 'crypto'
const PostSchema = new mongoose.Schema({
  text: {
    type: String,
    required: 'User Name is required'
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  comments: [{
    text: String,
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
  }],
  postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  created: {
    type: Date,
    default: Date.now
  }
})

modules.export default mongoose.model('Post', PostSchema)

