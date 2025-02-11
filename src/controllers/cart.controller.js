const CartService = require("../services/cart.service")


const findUserCart = async (req,res) =>{
    const user = await req.user;
    try{
        const orders = await CartService.findUserCart(user);
        return res.status(200).send(orders);

    }catch(e){
        return res.status(500).send({error:e.message});
    }
}


const addItemToCart = async (req,res) =>{
    const user = await req.user;
    try{
        
        const orders = await CartService.addCartItem(user._id,req.body);
        return res.status(200).send(orders);

    }catch(e){
        return res.status(500).send({error:e.message});
    }
}

module.exports ={
    findUserCart,
    addItemToCart,
}