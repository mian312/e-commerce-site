import express from 'express';
import dotenv from 'dotenv';
import data from './data.js';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

// Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the specified HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow the specified headers
    next();
});

dotenv.config();
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB")
    }).catch((err) => {
        console.log(err.message);
    });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/seed', seedRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);



// Error handler middleware
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});
