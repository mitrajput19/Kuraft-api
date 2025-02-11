const paymentService = require('../services/payment.service');

const createPaymentLink = async (req, res) => {
    try {
        const response = await paymentService.createPaymentLink(req.params.id);
        return res.status(200).send(response);
    } catch (e) {
        return res.status(500).send({ error: e.message });
    }
}

const updatePaymentInformation = async (req, res) => {
    try{
         await paymentService.updatePaymentInformation(req.query);
        return res.status(200).send({message:"payment information updated",success:true,status:true});
    }catch(e){
        return res.status(500).send({ error: e.message });

    }
}

module.exports = {
    createPaymentLink,
    updatePaymentInformation,
}