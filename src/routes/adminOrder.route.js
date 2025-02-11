const express= require("express")
const router = express.Router();
const adminOrderController = require("../controllers/adminOrder.controller");
const authenticate = require("../middleware/authenticate");

router.get('/',authenticate,adminOrderController.getAllOrders);
router.get('/:orderId/confirmed',authenticate,adminOrderController.confirmedOrders);
router.get('/:orderId/ship',authenticate,adminOrderController.shipOrders);
router.get('/:orderId/deliver',authenticate,adminOrderController.deliverOrders);
router.get('/:orderId/cancel',authenticate,adminOrderController.cancelledOrders);
router.get('/:orderId/delete',authenticate,adminOrderController.deleteOrders);


module.exports = router;