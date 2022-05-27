import Post from '../models/Post.js';
import asyncHandler from 'express-async-handler';

// @desc    get all  post
// @router  GET /post/getAll
// @access  Public
export const getAllPosts = asyncHandler(async (req, res) => {
  try {
    // Check for permission
    const posts = await Post.find();

    res.status(200);
    res.json(posts);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    get all  post
// @router  GET /post/get/:id
// @access  Public
export const getPost = asyncHandler(async (req, res) => {
  const { id } = req.body;
  try {
    // Check for permission
    const post = await Post.findById(id);

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
export const addPost = asyncHandler(async (req, res) => {
  const { title, type, liveUrl, content, category, subCategory } = req.body;
  const user = req.user;

  try {
    // Check for permission
    const post = await Post.create({
      title,
      type,
      liveUrl,
      content,
      postedBy: user._id,
      updatedBy: user._id,
      category,
      subCategory,
    });

    res.status(200);
    res.json(post);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    create a new post
// @router  POST /post/edit/:id
// @access  Role Required
export const editPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, type, liveUrl, content, category, subCategory } = req.body;
  const user = req.user;

  try {
    // Check for permission
    const editedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        type,
        liveUrl,
        content,
        updatedBy: user._id,
        category,
        subCategory,
      },
      { new: true }
    );

    res.status(200);
    res.json(editedPost);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    create a new post
// @router  POST /post/comment/:id
// @access  User Required
export const addComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const user = req.user;

  try {
    // Check for permission
    const post = await Post.findById(id);

    post.comments.push({ text, postedBy: user._id });

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.status(200);
    res.json(updatedPost);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
