const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
  {
    uid: {
        type: String,
    },
    pid:{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wishlist', wishlistSchema);