
const Cart = require("../models/cart.model");
const bcrypt = require("bcryptjs");
const jwtProvider = require("../config/jwtProvider");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

const createCart = async (user) => {
  try {
    const cart = new Cart({user});
    const createdCart = await cart.save();
    return createdCart;
    
  } catch (error) {
    throw new Error(error.message);
  }
};


async function findUserCart(user){
  try {
    let cart = await Cart.findOne({user:user._id});
    let cartItems = await CartItem.find({cart:cart._id}).populate("product");
    cart.cartItems = cartItems;
    let totalPrice = 0;
    let totalDiscountPrice = 0;
    let totalItem= 0;
    for(let cartItem of cart.cartItems){
      totalPrice +=cartItem.price;
      totalDiscountPrice += cartItem.discountPrice;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.discounts = totalDiscountPrice;
    cart.totalItem = totalItem;
    return cart;
    
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addCartItem (userId,req){
  try {
    const cart = await Cart.findOne({user:userId});
    const product = await Product.findById(req.productId);
    const isPresent = await CartItem.findOne({cart:cart,product:product._id,userId:userId});
    if(!isPresent){
      const cartItem = new CartItem({
        product:product._id,
        cart:cart._id,
        quantity:1,
        userId:userId,
        price: product.price,
        size:req.size,
        discountedPrice:product.discountedPrice
      });

      const createdCartItem = await cartItem.save();
      cart.cartItems.push(createdCartItem);
      await cart.save();
      return "Item Added to cart";
    }

  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = {
  createCart,
  findUserCart,
  addCartItem
};
