import Post from '../models/Post.js';
import asyncHandler from 'express-async-handler';
import FilteredWord from '../models/FilteredWord.js';
import Filter from 'bad-words';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';
// @desc    get all  post
// @router  GET /post/getAll
// @access  Public
export const getAllPosts = asyncHandler(async (req, res) => {
  try {
    // Check for permission
    const posts = await Post.find()
      .sort({ approvedAt: 'desc' })
      .populate('category')
      .populate('subCategory')
      .populate('postedBy')
      .populate('updatedBy')
      .populate('comments.postedBy');

    res.status(200);
    res.json(posts);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    get all  post by category
// @router  GET /post/getAll/category/:id
// @access  Public
export const getAllPostsByCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    // Check for permission
    const posts = await Post.find({ category: id })
      .populate('category')
      .populate('subCategory')
      .populate('postedBy')
      .populate('updatedBy')
      .populate('comments.postedBy');

    res.status(200);
    res.json(posts);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    get all  post by subcategory
// @router  GET /post/getAll/subcategory/:id
// @access  Public
export const getAllPostsBySubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    // Check for permission
    const posts = await Post.find({ subCategory: id })
      .populate('category')
      .populate('subCategory')
      .populate('postedBy')
      .populate('updatedBy')
      .populate('comments.postedBy');

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
  const { id } = req.params;
  try {
    // Check for permission
    const post = await Post.findById(id)
      .populate('category')
      .populate('subCategory')
      .populate('postedBy')
      .populate('updatedBy')
      .populate('comments.postedBy');

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
        category,
        subCategory,
        updatedBy: user._id,
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
// @router  PUT /put/approve/:id
// @access  User Required
export const approvePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { approved } = req.body;
  const user = req.user;
  try {
    const approvedPost = await Post.findByIdAndUpdate(
      id,
      {
        approved,
        approvedAt: new Date(),
        approvedBy: user._id,
      },
      { new: true }
    );

    res.status(200);
    res.json(approvedPost);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    if (user.isAdmin) {
      const deletedPost = await Post.findByIdAndDelete(id);
      res.status(200);
      res.json(deletedPost);
    }
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
    let filteredWords = await FilteredWord.find();
    filteredWords = filteredWords.map(filteredWord => filteredWord.word);
    const filter = new Filter();
    filter.addWords(...filteredWords);
    const filteredText = filter.clean(text);

    post.comments.push({ text: filteredText, postedBy: user._id });

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.status(200);
    res.json(updatedPost);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const testMail = asyncHandler(async (req, res) => {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'tupnewsletter@gmail.com',
      pass: 'biiywzzdkxalnygr',
    },
  });

  var mailOptions = {
    from: 'tupnewsletter@gmail.com',
    to: 'sfrannz@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

export const testSMS = asyncHandler(async (req, res) => {
  try {
    const resp = await fetch('https://rest.clicksend.com/v3/sms/send', {
      method: 'POST',
      body: JSON.stringify({
        messages: [
          {
            body: 'Naps Nub',
            to: '09273776823',
          },
          {
            body: 'Naps Nub',
            to: '09683443990',
          },
        ],
      }),
      headers: {
        'Content-type': 'application/json',
        Authorization:
          'Basic dHVwbmV3c2xldHRlckBnbWFpbC5jb206RlN1YXZlcmRlejEyMyE=',
      },
    });
    const data = await resp.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
