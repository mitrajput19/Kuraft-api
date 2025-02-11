const express = require("express")
const auth = require("../middleware/authenticate")
const router = express.Router()

const paymentController = require('../controllers/payment.controller')


router.post('/:id',auth,paymentController.createPaymentLink)
router.get('/',auth,paymentController.updatePaymentInformation)

module.exports = router;
