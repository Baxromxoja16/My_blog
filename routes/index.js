const express = require("express");
const router = express.Router();
const Maqola = require("../models/Maqola");
const Category = require('../models/Category')

/* GET home page. */
router.get("/", async function (req, res, next) {
  const maqola = await Maqola.find()
  await Promise.all(maqola.map(async (m) => (await m.populate('categoryId'))))
  const category = await Category.find()
  console.log(category);
  res.render("index",
    {
      layout: "layout",
      maqola,
      category
    });

});



module.exports = router;




