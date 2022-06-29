import mongoose from 'mongoose';
import FilteredWord from './FilteredWord.js';
import Filter from 'bad-words';
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
    approvedAt: { type: Date },
    comments: {
      type: [commentSchema],
      default: [],
    },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// //schema pre save hook
// postSchema.pre('save', async function (next) {
//   let filteredWords = await FilteredWord.find();
//   filteredWords = filteredWords.map(filteredWord => filteredWord.word);
//   const filter = new Filter();
//   filter.addWords(...filteredWords);
//   this.content = filter.clean(this.content);
//   next();
// });

const Post = mongoose.model('Post', postSchema);
export default Post;
