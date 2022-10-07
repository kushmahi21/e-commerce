const { result } = require('lodash');
const wishlist = require('../models/wishlist');
const Wishlist = require('../models/wishlist');

exports.addToWishlist = (req,res)=>{
    const wishlist = new Wishlist
    ({
        uid: req.body.uid,
        pid: req.body.pid,

    })
    wishlist.save((error,result)=>{
        if(error){
            return res.status(400).json({
                message: error.message
            })
        }else{
            return res.status(200).json({
                message: 'Added Successfully'
            })
        }
    })


}
exports.getwishlist = (req,res)=>{
    Wishlist.find({uid: req.params.uid},(error, result)=>{
        if(error){
            return res.status(400).json({
                message: error.message
            })
        }else{
            return res.status(200).json(result)
        }
    })
    .populate({
        path: 'pid',
        populate: {
            path: 'category'
        }
    })
}

exports.deletewishlist = (req,res) =>{
    Wishlist.findOneAndDelete({uid: req.params.uid, pid: req.params.pid},(error, result)=>{
        if(error){
            return res.status(400).json({
                message: error.message
            })
        }else{
            return res.status(200).json(result)
        }
    })
}