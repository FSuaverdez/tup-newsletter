import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Get all categories
// @router  GET /category/getAll
// @access  Public
export const userAuth = asyncHandler(async (req, res) => {
  const { googleId, imageUrl, email, name } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ googleId, imageUrl, email, name });
    } else {
      user = await User.findOneAndUpdate(
        { email },
        { googleId, imageUrl, email, name },
        { new: true }
      );
    }
    res.json({ user, token: generateToken(user._id) });
  } catch (error) {
    res.status(400);
    throw new Error('Invalid User Data.');
  }
});
