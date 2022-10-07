const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category doesn't exist",
      });
    }
    req.category = category;
    next();
  });
};

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.update = (req, res) => {
  console.log(req.body.name)
  Category.findByIdAndUpdate(req.params.categoryId, {name: req.body.name}, (error, category) => {
    if (error) {
      return res.status(400).json({ error });
    } else {
      return res.status(200).json({ category: category });
    }
  })

};

exports.remove = (req, res) => {
  Category.findByIdAndDelete(req.params.categoryId, (error, category) => {
    if (error) {
      return res.status(400).json({ error });
    } else {
      return res.status(200).json({ category: category });
    }
  })
};

exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
