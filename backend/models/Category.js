import mongoose from 'mongoose';

const subscribeSchema = {
  subscriptionType: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
};

const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    subCategories: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'SubCategory',
        },
      ],
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

const Category = mongoose.model('Category', categorySchema);
export default Category;
