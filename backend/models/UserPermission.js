import mongoose from 'mongoose';

const userPermissionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model('UserPermission', userPermissionSchema);
export default User;
