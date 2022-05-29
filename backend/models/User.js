import mongoose from 'mongoose';

const catPermission = {
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  userId: { type: String },
  role: { type: String },
};

const subCatPermission = {
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
  },
  userId: { type: String },
  role: { type: String },
};

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
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
