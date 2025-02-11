const OrderService = require("../services/order.service.js")


const createOrder = async (req,res) =>{
    const user = await req.user;
    try{
        console.log(req.body);
        let createdOrder = await OrderService.createOrder(user,req.body);
        return res.status(201).send(createdOrder);

    }catch(e){
        return res.status(500).send({error:e.message});
    }
}


const findOrderById = async (req,res) =>{
    try{
        console.log(req.params.id);
        const orders = await OrderService.findOrderById(req.params.id);
        return res.status(200).send(orders);

    }catch(e){
        return res.status(500).send({error:e.message});
    }
}

const orderHistory = async (req,res) =>{
    const user = await req.user;
    try{
        const orders = await OrderService.usersOrderHistory(user._id);
        return res.status(200).send(orders);

    }catch(e){
        return res.status(500).send({error:e.message});
    }
}


module.exports ={
    createOrder,
    findOrderById,
    orderHistory,
}