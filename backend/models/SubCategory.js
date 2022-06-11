import mongoose from 'mongoose';

const subscribeSchema = {
  subscriptionType: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
};

const subCategorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userPermissions: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'UserPermission',
        },
      ],
      default: [],
    },
    subscribers: {
      type: [subscribeSchema],
      default: [],
    },
  },

  { timestamps: true }
);
const SubCategory = mongoose.model('SubCategory', subCategorySchema);
export default SubCategory;
