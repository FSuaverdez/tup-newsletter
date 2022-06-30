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

const archivedPostSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    liveUrl: { type: String },
    content: { type: String, required: true },
    postedBy: { type: String },
    updatedBy: { type: String },
    category: { type: String },
    subCategory: { type: String },
    approved: { type: Boolean, default: false },
    approvedBy: { type: String },
    approvedAt: { type: Date },
    comments: {
      type: [commentSchema],
      default: [],
    },
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

const ArchivedPost = mongoose.model('ArchivedPost', archivedPostSchema);
export default ArchivedPost;