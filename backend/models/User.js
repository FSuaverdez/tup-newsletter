import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    googleId: { type: String },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    categoryPermission: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
        },
      ],
      default: [],
    },
    subCategoryPermission: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'SubCategory',
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
export default User
