const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, addOrderToUserHistory } = require('../controllers/user');
const {
  create,
  listOrders,
  getStatusValues,
  orderById,
  updateOrderStatus,
  updateProductStatusToReturned,
  updateProductStatusToReturnedAccepted,
  updateProductStatusToRefunded
} = require('../controllers/order');

const { decreaseQuantity, getOrderById } = require('../controllers/product');

router.post(
  '/order/create/:userId',
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);

//Getting update by user
router.post('/order/updateProductStatusToReturned', updateProductStatusToReturned);


//Accepting by admin
router.post('/order/updateProductStatusToReturnedAccepted', updateProductStatusToReturnedAccepted)

//Updating by admin refunded
router.post('/order/updateProductStatusToRefunded', updateProductStatusToRefunded);

router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders);

router.get('/order/:id', getOrderById)

router.get(
  '/order/status-values/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  getStatusValues
);

router.put(
  '/order/:orderId/status/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  updateOrderStatus
);

router.param('userId', userById);
router.param('orderId', orderById);

module.exports = router;
