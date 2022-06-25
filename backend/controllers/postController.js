import User from '../models/User.js';
import Post from '../models/Post.js';
import Category from '../models/Category.js';
import asyncHandler from 'express-async-handler';
import FilteredWord from '../models/FilteredWord.js';
import Filter from 'bad-words';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';
import SubCategory from '../models/SubCategory.js';
import { generateHtml, generatePendingHtml } from '../utils/generateHtml.js';
// @desc    get all  post
// @router  GET /post/getAll
// @access  Public
export const getAllPosts = asyncHandler(async (req, res) => {
  try {
    // Check for permission
    const posts = await Post.find()
      .select('-content')
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
// @router  GET /post/recommended/:postId
// @access  Public
export const getRecommendedPosts = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  try {
    // Check for permission
    const post = await Post.findById(postId)
      .select('-content')
      .populate('category')
      .populate('subCategory')
      .populate('postedBy')
      .populate('updatedBy')
      .populate('comments.postedBy');

    const categoryPosts = await Post.find({ category: post.category._id })
      .select('-content')
      .populate('category')
      .populate('subCategory')
      .limit(5)
      .sort({ approvedAt: 'desc' });

    const subCategoryPosts = await Post.find({
      subCategory: post.subCategory?._id,
    })
      .select('-content')
      .populate('category')
      .populate('subCategory')
      .limit(5)
      .sort({ approvedAt: 'desc' });

    res.status(200);
    res.json({ categoryPosts, subCategoryPosts });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    get all  post
// @router  GET /post/notifications
// @access  Public
export const getNotifications = asyncHandler(async (req, res) => {
  try {
    // Check for permission
    const posts = await Post.find()
      .select('-content')
      .populate('category')
      .populate('subCategory')
      .populate('postedBy')
      .populate('updatedBy')
      .populate('comments.postedBy')
      .sort({ approvedAt: 'desc' });

    res.status(200);
    res.json(posts);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    get all  post
// @router  GET /post/getAll
// @access  Public
export const getPostBySearch = asyncHandler(async (req, res) => {
  const { searchQuery, category, subCategory } = req.body;
  try {
    // Check for permission

    const query = new RegExp(searchQuery, 'i');
    let posts = await Post.find({
      $or: [{ title: query }],
    })
      .select('-content')
      .populate('category')
      .populate('subCategory')
      .populate('postedBy')
      .populate('updatedBy')
      .populate('comments.postedBy');
    let filteredPosts = [...posts];
    if (category) {
      filteredPosts = posts.filter(
        post =>
          post?.category?._id?.toString() === category ||
          post?.subCategory?._id?.toString() === subCategory
      );
    }

    if (subCategory) {
      filteredPosts = posts.filter(
        post =>
          post?.category?._id?.toString() === category ||
          post?.subCategory?._id?.toString() === subCategory
      );
    }
    res.status(200);
    res.json(posts);
  } catch (filteredPosts) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    get all  post by category
// @router  GET /post/getAll/category/:id
// @access  Public
export const getAllPostsByCategory = asyncHandler(async (req, res) => {
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
export const getAllPostsBySubCategory = asyncHandler(async (req, res) => {
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
export const getAllHomePosts = asyncHandler(async (req, res) => {
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
    let total = await Post.countDocuments({});
    const homePosts = await Post.find(findOption)
      .sort({ approvedAt: 'desc' })
      .limit(limit)
      .skip(startIndex * limit)
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
    const categoryPost = await Category.findById(category);
    const subCategoryPost = await SubCategory.findById(subCategory);
    const users = await User.find({ isAdmin: true });
    const emails = users.map(user => user.email);
    sendPendingNotif(post, emails, categoryPost, subCategoryPost);

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
// @router  POST /post/delete/comment
// @access  Role Required
export const deleteComment = asyncHandler(async (req, res) => {
  const { postId, commentId } = req.body;

  try {
    // Check for permission
    const post = await Post.findById(postId).select('-content');

    post.comments.pull(commentId);

    const updatedPost = await Post.findByIdAndUpdate(postId, post, {
      new: true,
    }).select('-content');

    res.status(200);
    res.json(post);
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
    const date = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Manila',
    });
    const approvedPost = await Post.findByIdAndUpdate(
      id,
      {
        approved,
        approvedAt: date,
        approvedBy: user._id,
      },
      { new: true }
    ).select('-content');

    if (approved) {
      const category = await Category.findById(
        approvedPost.category?.toString()
      ).populate('subscribers.user');
      const subCategory = await SubCategory.findById(
        approvedPost.subCategory?.toString()
      ).populate('subscribers.user');
      const categorySubscribers = category.subscribers.map(sub => sub);
      const subCategorySubscribers = subCategory.subscribers.map(sub => sub);
      const subscribers = [...categorySubscribers, ...subCategorySubscribers];
      const emailSubscribers = Array.from(
        new Set(
          subscribers
            .filter(sub => sub.subscriptionType === 'Email')
            .map(sub => sub.user.email)
        )
      );
      const smsSubscribers = Array.from(
        new Set(
          subscribers
            .filter(
              sub => sub.user.mobileNumber && sub.subscriptionType === 'SMS'
            )
            .map(sub => sub.user.mobileNumber)
        )
      );
      if (emailSubscribers.length > 0) {
        sendEmailNotif(approvedPost, emailSubscribers, category, subCategory);
      }
      if (smsSubscribers.length > 0) {
        sendSMSNotif(approvedPost, smsSubscribers);
      }
    }
    res.status(200);
    res.json(approvedPost);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    delete a post
// @router  DELETE /post/delete/:id
// @access  User Required
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

const sendPendingNotif = (post, emails, category, subCategory) => {
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
    to: emails,
    subject: `TUP Newsletter - ${post.title} - ${category.name} - Pending Post`,
    html: generatePendingHtml(post, category, subCategory),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const sendEmailNotif = (post, emails, category, subCategory) => {
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
    to: emails,
    subject: `TUP Newsletter - ${post.title} - ${category.name}`,
    html: generateHtml(post, category, subCategory),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      console.log('test');
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const sendSMSNotif = asyncHandler(async (post, numbers) => {
  const SMSMessages = numbers.map(number => ({
    body: `New TUP Newsletter Post ${post.title}\nLink: ${process.env.URL}/post/${post._id}`,
    to: number,
  }));
  console.log(SMSMessages);
  try {
    const resp = await fetch('https://rest.clicksend.com/v3/sms/send', {
      method: 'POST',
      body: JSON.stringify({
        messages: SMSMessages,
      }),
      headers: {
        'Content-type': 'application/json',
        Authorization:
          'Basic dHVwbmV3c2xldHRlckBnbWFpbC5jb206RlN1YXZlcmRlejEyMyE=',
      },
    });
    const data = await resp.json();
    console.log('SMS ' + data.response_code);
  } catch (error) {
    console.log(error);
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
