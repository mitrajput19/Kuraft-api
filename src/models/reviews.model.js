const mongoose = require("mongoose")


const reviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },  
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },  
    review:{
        type:Number,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
})

const  Reviews = mongoose.model("reivews",reviewSchema);
module.exports = Reviews;