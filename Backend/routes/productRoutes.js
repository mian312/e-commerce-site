import express from 'express';
import Product from '../module/productModule.js';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Internal server error' });
  }
});

const PAGE_SIZE = 4;
productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const brand = query.brand || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
          title: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
        : {};
    const brandFilter = brand && brand !== 'all' ?
      {
        brand: {
          $regex: brand,
          $options: 'i',
        },
      }
      : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
          rating: {
            $gte: rating,
          },
        }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
          // 1-50
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
          ? { price: 1 }
          : order === 'highest'
            ? { price: -1 }
            : order === 'toprated'
              ? { rating: -1 }
              : order === 'newest'
                ? { createdAt: -1 }
                : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...brandFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...brandFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id; // Retrieve the product ID from the URL parameter

    // Find the product by ID using the appropriate model and database query
    const product = await Product.findById(productId);

    if (product) {
      res.send(product); // Send the product as a JSON response
    } else {
      res.status(404).send({ message: 'Product not found' }); // Send a 404 error response as JSON if the product is not found
    }
  } catch (error) {
    console.error('Error occurred while fetching the product:', error);
    res.status(500).send({ message: 'Internal server error' }); // Send a 500 error response as JSON for any server errors
  }
});

export default productRouter;