const CartItemService = require("../services/cartItem.service")


const updateCartItem = async (req,res) =>{
    const user = await req.user;
    try{

        const orders = await CartItemService.updateCartItem(user._id,req.params.id,req.body);
        return res.status(200).send(orders);

    }catch(e){
        return res.status(500).send({error:e.message});
    }
}


const removeCartItem = async (req,res) =>{
    const user = await req.user;
    try{
        await CartItemService.removeCartItem(user._id,req.params.id);
        return res.status(200).send({message:"cart item removed successfully"});

    }catch(e){
        return res.status(500).send({error:e.message});
    }
}

module.exports ={
    updateCartItem,
    removeCartItem,
}