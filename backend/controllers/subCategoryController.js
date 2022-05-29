import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import SubCategory from '../models/SubCategory.js';
import User from '../models/User.js';
import UserPermission from '../models/UserPermission.js';

// @desc    Create a new subcategory
// @router  POST /subcategory/add
// @access  Admin Role Required
export const addSubCategory = asyncHandler(async (req, res) => {
  const user = req.user;
  const { name, description, categoryId } = req.body;
  try {
    if (user.isAdmin) {
      let category = await Category.findById(categoryId);
      if (category) {
        let subCategory = await SubCategory.create({
          name,
          creator: user._id,
          description,
          category: categoryId,
        });
        category.subCategories.push(subCategory._id);
        const updatedCategory = await Category.findByIdAndUpdate(
          categoryId,
          category,
          { new: true }
        );

        res.status(201).json(updatedCategory);
      } else {
        res.status(401);
        throw new Error('Category not found');
      }
    } else {
      res.status(401);
      throw new Error('Not Authorized');
    }
  } catch (error) {
    console.log(error);
    throw new Error('Invalid Category Data');
  }
});

// @desc    Get all subcategories
// @router  GET /subcategory/getAll
// @access  Public
export const getSubCategories = asyncHandler(async (req, res) => {
  try {
    const subCategories = await SubCategory.find({});

    res.status(200).json(subCategories);
  } catch (error) {
    res.status(401);
    throw new Error('Something went wrong. Unable to retrieve Categories.');
  }
});

// @desc    Get all subcategories from a category
// @router  GET /subcategory/getAll/:id
// @access  Public
export const getSubCategoriesByCategory = asyncHandler(async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ category: req.params.id });

    res.status(200).json(subCategories);
  } catch (error) {
    res.status(401);
    throw new Error('Something went wrong. Unable to retrieve Categories.');
  }
});

// @desc    Get a category
// @router  GET /subcategory/:id
// @access  Public
export const getSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const subCategory = await SubCategory.findById(id).populate('category');
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(401);
    throw new Error('Something went wrong. Unable to retrieve Category.');
  }
});

// @desc    Get a category
// @router  GET /subcategory/:id/userPermissions
// @access  Public
export const getSubCategoryUserPermissions = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const subCategory = await SubCategory.findById(id).populate({
      path: 'userPermissions',
      populate: { path: 'user' },
    });
    res.status(200).json(subCategory.userPermissions);
  } catch (error) {
    res.status(401);
    throw new Error(
      'Something went wrong. Unable to retrieve Sub Category User Permissions.'
    );
  }
});

// @desc    Add A user Permission
// @router  GET /subcategory/addPermission
// @access  Private Required Auth
export const addPermission = asyncHandler(async (req, res) => {
  const user = req.user;
  const { email, role, subCategoryId } = req.body;
  console.log(user);
  try {
    if (user.isAdmin) {
      let subCategory = await SubCategory.findById(subCategoryId);
      if (!subCategory) {
        res.status(401);
        throw new Error('SubCategory not found');
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

      subCategory.userPermissions.push(newPermission._id);

      const updatedSubCategory = await SubCategory.findByIdAndUpdate(
        subCategoryId,
        subCategory,
        { new: true }
      );

      res.status(201).json(updatedSubCategory);
    } else {
      res.status(401);
      throw new Error('Not Authorized');
    }
  } catch (error) {
    console.log(error);
    throw new Error('Invalid Category Data');
  }
});
