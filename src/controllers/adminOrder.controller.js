const OrderService = require("../services/order.service")


const getAllOrders = async (req,res) =>{
    try{
        const orders = await OrderService.getAllOrders();
        return res.status(200).send(orders);

    }catch(e){
        return res.status(500).send({error:e.message});
    }
}


const confirmedOrders = async (req,res) =>{
    const orderId = req.params.orderId;
    try{
        const orders = await OrderService.confirmedOrder(orderId);
        return res.status(200).send(orders);

    }catch(e){
        return res.status(500).send({error:e.message});
    }
}

const shipOrders = async (req,res) =>{
    const orderId = req.params.orderId;
    try{
        const orders = await OrderService.shipOrder(orderId);
        return res.status(200).send(orders);

    }catch(e){
        return res.status(500).send({error:e.message});
    }
}

const deliverOrders = async (req,res) =>{
    const orderId = req.params.orderId;
    try{
        const orders = await OrderService.deliveredOrder(orderId);
        return res.status(200).send(orders);

    }catch(e){
        return res.status(500).send({error:e.message});
    }
}


const cancelledOrders = async (req,res) =>{
    const orderId = req.params.orderId;
    try{
        const orders = await OrderService.cancelOrder(orderId);
        return res.status(200).send(orders);

    }catch(e){
        return res.status(500).send({error:e.message});
    }
}


const deleteOrders = async (req,res) =>{
    const orderId = req.params.orderId;
    try{
        const orders = await OrderService.deleteOrder(orderId);
        return res.status(200).send(orders);

    }catch(e){
        return res.status(500).send({error:e.message});
    }
}


module.exports ={
    getAllOrders,
    confirmedOrders,
    shipOrders,
    deliverOrders,
    cancelledOrders,
    deleteOrders,
}