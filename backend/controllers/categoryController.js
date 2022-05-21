import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import User from '../models/User.js';
import UserPermission from '../models/UserPermission.js';

// @desc    Create a new category
// @router  POST /category/add
// @access  Admin Role Required
export const addCategory = asyncHandler(async (req, res) => {
  const user = req.user;
  const { name, description } = req.body;
  try {
    if (user.isAdmin) {
      let category = await Category.create({
        name,
        creator: user._id,
        description,
      });

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

// @desc    Get a category
// @router  GET /category/:id
// @access  Public
export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400);
      throw new Error('Category Id is required');
    }
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(401);
    throw new Error('Something went wrong. Unable to retrieve Category.');
  }
});

// @desc    Get a category
// @router  GET /category/:id/userPermissions
// @access  Public
export const getCategoryUserPermissions = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400);
      throw new Error('Category Id is required');
    }
    const category = await Category.findById(id).populate({
      path: 'userPermissions',
      populate: { path: 'user' },
    });
    res.status(200).json(category.userPermissions);
  } catch (error) {
    res.status(401);
    throw new Error(
      'Something went wrong. Unable to retrieve Category User Permissions.'
    );
  }
});

// @desc    Add A user Permission
// @router  GET /category/addPermission
// @access  Private Required Auth
export const addPermission = asyncHandler(async (req, res) => {
  const user = req.user;
  const { email, role, categoryId } = req.body;
  try {
    if (user.isAdmin) {
      if (!categoryId) {
        res.status(400);
        throw new Error('Category Id is required');
      }

      let category = await Category.findById(categoryId);
      if (!category) {
        res.status(401);
        throw new Error('Category not found');
      }

      let user = await User.findOne({ email });
      if (!user) {
        res.status(401);
        throw new Error(`Cannot find User with email ${email}.`);
      }

      let newPermission = await UserPermission.create({
        user: user._id,
        role,
      });

      category.userPermissions.push(newPermission._id);

      const updatedSubCategory = await Category.findByIdAndUpdate(
        categoryId,
        category,
        { new: true }
      ).populate('userPermissions');

      res.status(201).json(updatedSubCategory);
    } else {
      res.status(401);
      throw new Error('Not Authorized');
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});
