import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import SubCategory from '../models/SubCategory.js';
import User from '../models/User.js';
import UserPermission from '../models/UserPermission.js';
import Post from '../models/Post.js';
import { havePermissionsCategory } from '../utils/checkPermissions.js';

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
    console.log(error);
    throw new Error(error.message);
  }
});

// @desc    Create a new category
// @router  PUT /category/edit/:id
// @access  Admin Role Required
export const editCategory = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const category = await Category.findById(id).populate({
      path: 'userPermissions',
      populate: { path: 'user' },
    });
    if (havePermissionsCategory(user, category)) {
      let updatedCategory = await Category.findByIdAndUpdate(
        id,
        {
          name,
          creator: user._id,
          description,
        },
        { new: true }
      );

      res.status(201).json(updatedCategory);
    } else {
      res.status(401);
      throw new Error('Not Authorized');
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

// @desc    Create a new category
// @router  DELETE /category/delete/:id
// @access  Admin Role Required
export const deleteCategory = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const category = await Category.findById(id).populate({
      path: 'userPermissions',
      populate: { path: 'user' },
    });
    if (user.isAdmin) {
      let removedCategory = await Category.findByIdAndDelete(id);
      await Post.deleteMany({ category: id });
      const subCatToRemove = [];
      const userPermissionToRemove = [];
      removedCategory.subCategories.forEach(async s => {
        subCatToRemove.push(s.toString());
        const subCat = await SubCategory.findById(s);
        subCat.userPermissions.forEach(u => {
          userPermissionToRemove.push(u.toString());
        });
        await Post.deleteMany({ subCategory: s.toString() });
      });
      removedCategory.userPermissions.forEach(s => {
        userPermissionToRemove.push(s.toString());
      });
      await Post.deleteMany({ category: category._id.toString() });
      await UserPermission.deleteMany({ _id: { $in: userPermissionToRemove } });
      await SubCategory.deleteMany({ _id: { $in: subCatToRemove } });
      res.status(201).json(removedCategory);
    } else {
      res.status(401);
      throw new Error('Not Authorized');
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

// @desc    Get all categories
// @router  GET /category/getAll
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({}).populate('subCategories');
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
    console.log(error);
    throw new Error(error.message);
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
    console.log(error);
    throw new Error(error.message);
  }
});

// @desc    Add A user Permission
// @router  GET /category/addPermission
// @access  Private Required Auth
export const addPermission = asyncHandler(async (req, res) => {
  const user = req.user;
  const { email, role, categoryId } = req.body;
  try {
    if (!categoryId) {
      res.status(400);
      throw new Error('Category Id is required');
    }

    let category = await Category.findById(categoryId);
    if (havePermissionsCategory(user, category)) {
      if (!category) {
        res.status(401);
        throw new Error('Category not found');
      }

      let userToUpdate = await User.findOne({ email });
      if (!userToUpdate) {
        res.status(401);
        throw new Error(`Cannot find User with email ${email}.`);
      }

      let newPermission = await UserPermission.create({
        user: userToUpdate._id,
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

// @desc    Add A subscriber
// @router  POST /category/subscribe
// @access  Private Required Auth
export const addSubscriber = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id, type } = req.body;
  try {
    if (!id) {
      res.status(400);
      throw new Error('Category Id is required');
    }

    let category = await Category.findById(id);

    if (!category) {
      res.status(401);
      throw new Error('Category not found');
    }

    category.subscribers.push({ user: user._id, subscriptionType: type });

    let updatedCategory = await Category.findByIdAndUpdate(id, category, {
      new: true,
    });

    res.status(201).json(updatedCategory);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

// @desc    remove subscriber
// @router  PUT /category/unsubscribe
// @access  Private Required Auth
export const removeSubscriber = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id, type } = req.body;
  try {
    if (!id) {
      res.status(400);
      throw new Error('Category Id is required');
    }

    let category = await Category.findById(id).populate('subscribers');

    if (!category) {
      res.status(401);
      throw new Error('Category not found');
    }

    category.subscribers = category.subscribers.filter(u => {
      return (
        u.user.toString() !== user._id.toString() || type !== u.subscriptionType
      );
    });

    let updatedCategory = await Category.findByIdAndUpdate(id, category, {
      new: true,
    });

    res.status(201).json(updatedCategory);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});
