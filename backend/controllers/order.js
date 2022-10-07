const { Order, CartItem } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      req.order = order;
      next();
    });
};

exports.create = (req, res) => {
  // console.log('CREATE ORDER: ', req.body);
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

exports.listOrders = (req, res) => {
  Order.find()
    .populate('user', '_id name address')
    .sort('-created')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      res.json(orders);
    });
};

exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path('status').enumValues);
};

exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(order);
    }
  );
};

exports.updateProductStatusToReturned = (req, res) => {
  const orderId = req.body.orderId;
  const product_s_id = req.body.product_s_id;
  console.log('orderId:', orderId);
  console.log('productID:', product_s_id);
  Order.update(
    {
      _id: req.body.orderId,
      "products._id": req.body.product_s_id
    }, {'$set' : {'products.$.returned': true}}, (err, result) => {
      if(err) return res.status(400).json({error: err.message});
      return res.status(200).json({success: true, data: result});
    }
  )
}

exports.updateProductStatusToReturnedAccepted = (req, res) => {
  const orderId = req.body.orderId;
  const product_s_id = req.body.product_s_id;
  console.log('orderId:', orderId);
  console.log('productID:', product_s_id);
  Order.update(
    {
      _id: req.body.orderId,
      "products._id": req.body.product_s_id
    }, {'$set' : {'products.$.returnAccepted': true}}, (err, result) => {
      if(err) return res.status(400).json({error: err.message});
      return res.status(200).json({success: true, data: result});
    }
  )
}

exports.updateProductStatusToRefunded = (req, res) => {
  const orderId = req.body.orderId;
  const product_s_id = req.body.product_s_id;
  console.log('orderId:', orderId);
  console.log('productID:', product_s_id);
  Order.update(
    {
      _id: req.body.orderId,
      "products._id": req.body.product_s_id
    }, {'$set' : {'products.$.refunded': true}}, (err, result) => {
      if(err) return res.status(400).json({error: err.message});
      return res.status(200).json({success: true, data: result});
    }
  )
}