import asyncHandler from 'express-async-handler';

// @desc    create a new post
// @router  POST /post/comment/:id
// @access  User Required
export const addFilteredWord = asyncHandler(async (req, res) => {
  const { word } = req.body;

  try {
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
