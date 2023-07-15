import express from 'express';
import Product from '../module/productModule.js';
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