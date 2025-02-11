const Rating  = require("../models/rating.model");
const productService = require("../services/product.service")

async function createRating(requestData,user){
    const product = await productService.findProductById(requestData.productId);
    const review = new Rating({
        user:user._id,
        rating:requestData.rating,
        product: product._id,
        createdAt: new Date(),
    })
    return await review.save();
}

async function getProductRating(productId){
    return await Rating.find({product:productId});
}

module.exports = {
    createRating,
    getProductRating,
}