
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.post('/', authenticate, authorize('admin', 'operator'), orderController.createOrder);
router.get('/', authenticate, authorize('admin', 'operator', 'viewer'), orderController.getOrders);
router.get('/report/status', authenticate, authorize('admin'), orderController.getOrdersByStatus);
router.get('/report/client', authenticate, authorize('admin'), orderController.getOrdersByClient);
router.get('/report/month', authenticate, authorize('admin'), orderController.getOrdersByMonth);
router.get('/:id', authenticate, authorize('admin', 'operator', 'viewer'), orderController.getOrderById);
router.put('/:id', authenticate, authorize('admin'), orderController.updateOrder);
router.delete('/:id', authenticate, authorize('admin'), orderController.deleteOrder);

module.exports = router;
