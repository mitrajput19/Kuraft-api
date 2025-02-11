const razorpay = require("../config/razorpayClient");
const orderService = require("../services/order.service");



const createPaymentLink = async (orderId) => {
  try {
    const order = await orderService.findOrderById(orderId);
    if (!order) {
        throw new Error("Order not found");
      }
    const paymentLinkRequest = {
        amount: order.totalPrice * 100,
        currency: "INR",
        customer: {
            name: order.user.firstName + " " + order.user.lastName,
            email: order.user.email,
            contact: order.user.mobile,
    
        },
        nodeify:{
            sms:true,
            email:true,
        },
        reminder_enable:true,
        callback_url: `http://localhost:5173/payment/${orderId}`,
        callback_method: "get",
    }
    const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
    
    const paymentLinkId = paymentLink.id;
    const paymentLinkUrl = paymentLink.short_url;
    const response = {
        paymentLinkId,
        paymentLinkUrl,
    };
    return response;
  }
  catch (e) {
    throw new Error(e.message);
  }
}

const updatePaymentInformation = async (reqData) => {
    const paymentId = reqData.payment_id;
    const orderId = reqData.order_id;
    try{

        const order = await orderService.findOrderById(orderId);
        const payment = await razorpay.payments.fetch(paymentId);
        if(payment.status === "captured"){
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.status = "COMPLETED";
            order.orderStatus = "PLACED";

            await order.save();
        }
        const response = {
            message: "Your order is placed successfully",
            success: true,

        };
        return response;

    }catch(e){
        throw new Error(e.message);
    }
}


module.exports = {
    createPaymentLink,
    updatePaymentInformation,
}