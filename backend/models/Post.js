import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    liveUrl: { type: String },
    content: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
    approved: { type: Boolean, default: false },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
