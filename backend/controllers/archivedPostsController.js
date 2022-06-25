import User from '../models/User.js';
import Post from '../models/Post.js';
import ArchivedPost from '../models/ArchivedPost.js'
import Category from '../models/Category.js';
import asyncHandler from 'express-async-handler';
import FilteredWord from '../models/FilteredWord.js';
import Filter from 'bad-words';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';
import SubCategory from '../models/SubCategory.js';
import { generateHtml, generatePendingHtml } from '../utils/generateHtml.js';

// @desc    get all  post by category
// @router  GET /post/getAll/category/:id
// @access  Public
export const getAllArchivedByCategory = asyncHandler(async (req, res) => {
  const { id, page } = req.params;
  const { searchQuery, fromDate, toDate } = req.query;
  try {
    // Check for permission
    const query = new RegExp(searchQuery, 'i');
    const limit = 5;
    const startIndex = Number(page) - 1;
    let total = await Post.countDocuments({ category: id });
    let findOption = {};
    if (searchQuery) {
      findOption = { $or: [{ title: query }] };
    }
    if (fromDate && toDate) {
      findOption = {
        ...findOption,
        approvedAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
      };
    } else if (fromDate && !toDate) {
      findOption = {
        ...findOption,
        approvedAt: { $gte: new Date(fromDate) },
      };
    }

    findOption = { ...findOption, category: id };
    findOption = { ...findOption, approved: true };
    const posts = await Post.find(findOption)
      .sort({ approvedAt: 'desc' })
      .limit(limit)
      .skip(startIndex * limit)
      .populate('category')
      .populate('subCategory')
      .populate('postedBy')
      .populate('updatedBy')
      .populate('comments.postedBy');
    if (searchQuery) {
      total = posts.length;
    }
    const numberOfPages = Math.ceil(total / limit);
    res.status(200);
    res.json({ posts, numberOfPages });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    get all  post by subcategory
// @router  GET /post/getAll/subcategory/:id
// @access  Public
export const getAllArchivedBySubCategory = asyncHandler(async (req, res) => {
  const { id, page } = req.params;
  const { searchQuery, fromDate, toDate } = req.query;
  try {
    // Check for permission
    const query = new RegExp(searchQuery, 'i');
    const limit = 5;
    const startIndex = Number(page) - 1;
    let total = await Post.countDocuments({ subCategory: id });
    let findOption = {};
    if (searchQuery) {
      findOption = { $or: [{ title: query }] };
    }
    if (fromDate && toDate) {
      findOption = {
        ...findOption,
        approvedAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
      };
    } else if (fromDate && !toDate) {
      findOption = {
        ...findOption,
        approvedAt: { $gte: new Date(fromDate) },
      };
    }

    findOption = { ...findOption, subCategory: id };
    findOption = { ...findOption, approved: true };
    const posts = await Post.find(findOption)
      .sort({ approvedAt: 'desc' })
      .limit(limit)
      .skip(startIndex * limit)
      .populate('category')
      .populate('subCategory')
      .populate('postedBy')
      .populate('updatedBy')
      .populate('comments.postedBy');
    if (searchQuery) {
      total = posts.length;
    }
    const numberOfPages = Math.ceil(total / limit);
    res.status(200);
    res.json({ posts, numberOfPages });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    get all  post for home
// @router  GET /post/getAll/:page
// @access  Public
export const getAllArchivedPosts = asyncHandler(async (req, res) => {
  const { page } = req.params;
  const { searchQuery, category, subCategory, fromDate, toDate } = req.query;

  try {
    const query = new RegExp(searchQuery, 'i');

    let findOption = {};

    if (searchQuery) {
      findOption = { $or: [{ title: query }, { content: query }] };
    }

    if (category) {
      findOption = { ...findOption, category };
    }

    if (subCategory) {
      findOption = { ...findOption, subCategory };
    }

    if (fromDate && toDate) {
      findOption = {
        ...findOption,
        approvedAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
      };
    } else if (fromDate && !toDate) {
      findOption = {
        ...findOption,
        approvedAt: { $gte: new Date(fromDate) },
      };
    }
    findOption = { ...findOption, approved: true };
    const limit = 5;
    const startIndex = Number(page) - 1;
    let total = await ArchivedPost.countDocuments({});
    const homePosts = await ArchivedPost.find(findOption)
      .sort({ createdAt: 'desc' })
      .limit(limit)
      .skip(startIndex * limit)
      .select('-content')
      .populate('category')
      .populate('subCategory')
      .populate('postedBy')
      .populate('updatedBy')
      .populate('comments.postedBy');
    if (searchQuery || category || subCategory) {
      total = homePosts.length;
    }
    const numberOfPages = Math.ceil(total / limit);
    res.status(200);
    res.json({ homePosts, numberOfPages });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    get all  post
// @router  GET /post/get/:id
// @access  Public
export const getArchived = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Check for permission
    const post = await ArchivedPost.findById(id)
    res.status(200);
    res.json(post);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    create a new post
// @router  POST /post/add
// @access  Role Required
export const archivePost = asyncHandler(async (req, res) => {
    const id = req.params.id
  try {
    const post = await Post.findById(id);
    const category = await Category.findById(post.category);
    const subCategory = await SubCategory.findById(post.subCategory);
    const postBy = await User.findById(post.postedBy);
    const updateBy = await User.findById(post.updateBy);
    const approveBy = await User.findById(post.approveBy);
    const archive = await ArchivedPost.create({
        title:post.title,
        type: post.type,
        liveUrl:post.liveUrl,
        content: post.content,
        postedBy: postBy?.name,
        updatedBy: updateBy?.name,
        category: category?.name,
        subCategory: subCategory?.name||'',
        approved: post.approved,
        comments: post?.comments,
        approvedAt: post.approvedAt,
        approvedBy: approveBy?.name
    })
    await Post.findByIdAndDelete(id);
    res.status(200);
    res.json(archive);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


// @desc    delete a post
// @router  DELETE /post/delete/:id
// @access  User Required
export const deleteArchived = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    if (user.isAdmin) {
      const deletedPost = await ArchivedPost.findByIdAndDelete(id);
      res.status(200);
      res.json(deletedPost);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


