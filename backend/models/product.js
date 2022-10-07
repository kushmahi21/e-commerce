const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const feedbackSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comment: {
    type: String,
    required: true
  }
})

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      required: false,
      type: Boolean,
    },
    feedbacks: [feedbackSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
