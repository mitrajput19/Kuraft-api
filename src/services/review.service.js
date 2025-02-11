const Review  = require("../models/reviews.model");
const productService = require("../services/product.service")

async function createReview(requestData,user){
    const product = await productService.findProductById(requestData.productId);
    const review = new Review({
        user:user._id,
        review:requestData.review,
        product: product._id,
        createdAt: new Date(),
    })
    await product.save();
    return await review.save();
}

async function getAllReview(productId){
    // const product = await productService.findProductById(productId);
    return await Review.find({product:productId}).populate("user");
}

module.exports = {
    createReview,
    getAllReview,
}