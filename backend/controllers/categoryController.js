import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';

// @desc    Create a new category
// @router  POST /category/add
// @access  Admin Role Required
export const addCategory = asyncHandler(async (req, res) => {
  const user = req.user;
  const { name } = req.body;
  try {
    if (user.isAdmin) {
      let category = await Category.create({ name, creator: user._id });

      res.status(201).json(category);
    } else {
      res.status(401);
      throw new Error('Not Authorized');
    }
  } catch (error) {
    throw new Error('Invalid Category Data');
  }
});

// @desc    Get all categories
// @router  GET /category/getAll
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});

    res.status(200).json(categories);
  } catch (error) {
    res.status(401);
    throw new Error('Something went wrong. Unable to retrieve Categories.');
  }
});
