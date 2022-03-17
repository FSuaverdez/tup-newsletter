import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    subCategories: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
        },
      ],
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

const Category = mongoose.model('Category', categorySchema)
export default Category
