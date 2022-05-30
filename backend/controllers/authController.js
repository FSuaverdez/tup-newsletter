import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import SubCategory from '../models/SubCategory.js';
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

// @desc    Get all categories
// @router  GET /category/getAll
// @access  Public
export const getUserPermissions = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    const categoryPermission = await Category.find({}).populate(
      'userPermissions'
    );
    const subCategoryPermission = await SubCategory.find({}).populate(
      'userPermissions'
    );

    const userPermissions = {
      categoryPermissions: [],
      subCategoryPermissions: [],
      showCategoryAdmin: false,
      showSubCategoryAdmin: false,
      showAdmin: false,
      showContent: false,
      showApproval: false,
    };

    categoryPermission.forEach(c =>
      c.userPermissions.forEach(p => {
        if (p.user == id) {
          userPermissions.categoryPermissions.push(c);
          if (p.role == 'Admin' || user.isAdmin) {
            userPermissions.showCategoryAdmin = true;
            userPermissions.showAdmin = true;
            userPermissions.showApproval = true;
            userPermissions.showContent = true;
          }
          if (p.role == 'Editor') {
            userPermissions.showContent = true;
          }
        }
      })
    );

    subCategoryPermission.forEach(c =>
      c.userPermissions.forEach(p => {
        if (p.user == id) {
          userPermissions.subCategoryPermissions.push(c);
          if (p.role == 'Admin') {
            userPermissions.showAdmin = true;
            userPermissions.showSubCategoryAdmin = true;
            userPermissions.showApproval = true;
            userPermissions.showContent = true;
          }
          if (p.role == 'Editor') {
            userPermissions.showContent = true;
          }
        }
      })
    );

    if (user.isAdmin) {
      userPermissions.showAdmin = true;
      userPermissions.showCategoryAdmin = true;
      userPermissions.showSubCategoryAdmin = true;
      userPermissions.showApproval = true;
      userPermissions.showContent = true;
    }
    res.status(200);
    res.json(userPermissions);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error('Invalid User Data.');
  }
});
