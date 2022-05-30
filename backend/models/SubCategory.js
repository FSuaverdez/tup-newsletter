import mongoose from 'mongoose';

const subCategorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
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
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      default: [],
    },
  },

  { timestamps: true }
);
const SubCategory = mongoose.model('SubCategory', subCategorySchema);
export default SubCategory;
