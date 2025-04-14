
const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/users', require('./user.routes'));
router.use('/orders', require('./order.routes'));
router.use('/health', require('./health.routes'));

module.exports = router;
