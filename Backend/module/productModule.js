import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        id : { type: String, required: true, unique: true },
        title : { type: String, required: true },
        description : { type: String, required: true },
        price : { type: Number, required: true },
        discountPercentage : { type: Number, required: true },
        rating : { type: Number, required: false },
        stock : { type: Number, required: true },
        brand : { type: String, required: true },
        category : { type: String, required: true },
        thumbnail : { type: String, required: true },
        images : { type: Array, required: true },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
