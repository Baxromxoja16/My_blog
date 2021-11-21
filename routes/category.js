const { Router } = require('express')
const router = Router()
const Maqola = require('../models/Maqola')
const fileUpload = require('../middleware/fileUpload')
const toDelete = require('../middleware/toDelete')
const Category = require('../models/Category')
const mongoose = require("mongoose")
const auth = require('../middleware/auth')

router.get('/read/:id', auth, async (req, res) => {
  const { categoryTitle } = await Category.findById(req.params.id)
  let products = await Category.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id)
      }
    },
    {
      $lookup: {
        from: 'maqolas',
        localField: "_id",
        foreignField: "categoryId",
        as: 'mahsulotlar'
      }
    },
    {
      $unwind: {
        path: '$mahsulotlar'
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id'
        },
        mahsulotlar: {
          $push: '$mahsulotlar'
        }
      }
    },
    {
      $project: {
        _id: '$id._id',
        categoryTitle: '$_id.categoryTitle',
        mahsulotlar: '$mahsulotlar'
      }
    }
  ])

  products = products[0].mahsulotlar
  res.render('admin/category', {
    header: categoryTitle,
    layout: 'main',
    products
  })


})
router.get("/read", async (req, res) => {
  const categories = await Category.find();
  res.render("admin/categories", {
    title: "Kategoriyalarni korish",
    layout: "main",
    header: "Kategoriyalarni korish",
    categories,
  });
});


router.get("/add", (req, res) => {

  res.render("admin/categoryCreate", {
    title: "Kategoriyalarni yaratish",
    layout: "main",
    header: "Kategoriyalarni yaratish",
  });
});



router.post("/add", async (req, res) => {

  const { categoryTitle } = req.body;
  console.log(categoryTitle);
  const category = new Category({ categoryTitle });
  await category.save();
  res.redirect("/admin/category/read");
});



router.get("/edit/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  
  res.render("admin/categoryEdit", {
    header: "Kategoriyalarni yangilash",
    layout: "main",
    category,
  });
});


router.post("/edit/:id", async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  await Category.findByIdAndUpdate(req.body, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/admin/category/read");
    }
  });
});

router.get('/delete/:id', auth, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id, req.body,)
  res.redirect('/admin/category/read')
})

module.exports = router;
