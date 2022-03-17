import Category from '../models/Category.js';

export const addCategory = async (req, res) => {
  const user = req.user;
  const { name } = req.body;
  if (user.isAdmin) {
    let category = await Category.create({ name, creator: user._id });

    res.status(201).json(category);
  } else {
    res.status(401);
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    console.log(categories);

    res.status(200).json(categories);
  } catch (error) {
    res.status(401).json(error);
  }
};
