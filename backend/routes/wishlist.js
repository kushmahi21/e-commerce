const express = require('express');
const router = express.Router();
const {addToWishlist, getwishlist, deletewishlist} = require('../controllers/wishlist');

router.post('/addToWishlist', addToWishlist)
router.get('/getwishlist/:uid', getwishlist)
router.delete('/deletewishlist/:uid/:pid', deletewishlist)















module.exports = router;