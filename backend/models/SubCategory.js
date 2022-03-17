import mongoose from 'mongoose'

const subCategorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    userPermissions: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          role: {
            type: String,
            required: true,
            default: 'ADMIN',
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
)
const SubCategory = mongoose.model('SubCategory', subCategorySchema)
export default SubCategory
