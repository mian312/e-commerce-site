import express from 'express'
import Product from '../module/productModule.js';
import data from '../data.js';
import User from '../module/userModule.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    // Remove existing products
    await Product.deleteMany();
    // Insert new products
    const createdProducts = await Product.insertMany(data.products);

    // Remove existing users
    await User.deleteMany();
    // Insert new users
    const createdUsers = await User.insertMany(data.users);

    res.send({ createdProducts, createdUsers });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


export default seedRouter;
