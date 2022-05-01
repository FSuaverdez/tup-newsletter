import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import SubCategory from '../models/SubCategory.js';

// @desc    Create a new subcategory
// @router  POST /subcategory/add
// @access  Admin Role Required
export const addSubCategory = asyncHandler(async (req, res) => {
  const user = req.user;
  const { name, description, categoryId } = req.body;
  console.log(req.body);
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

        res.status(201).json(subCategory);
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
    const subCategory = await SubCategory.findById(id);
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(401);
    throw new Error('Something went wrong. Unable to retrieve Category.');
  }
});
