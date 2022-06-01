import asyncHandler from 'express-async-handler';
import FilteredWord from '../models/FilteredWord.js';
// @desc    create a new post
// @router  POST /post/comment/:id
// @access  User Required
export const addFilteredWord = asyncHandler(async (req, res) => {
  const { word } = req.body;

  try {
    const isExisting = await FilteredWord.find({ word });
    if (isExisting.length > 0) {
      throw new Error('Word already exists.');
    }
    const filteredWord = await FilteredWord.create({ word });

    res.status(201);
    res.json(filteredWord);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    create a new post
// @router  POST /post/comment/:id
// @access  User Required
export const removeFilteredWord = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const filteredWord = await FilteredWord.findByIdAndDelete(id);

    res.status(201);
    res.json(filteredWord);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    create a new post
// @router  POST /post/comment/:id
// @access  User Required
export const getFilteredWord = asyncHandler(async (req, res) => {
  try {
    let filteredWords = await FilteredWord.find();

    res.status(200);
    res.json(filteredWords);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
