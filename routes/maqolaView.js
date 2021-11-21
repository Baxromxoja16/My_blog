const express = require("express");
const router = express.Router();
const Maqola = require('../models/Maqola')

router.get("/:id", async function (req, res, next) {
    const maqola = await Maqola.findById(req.params.id)
    console.log(maqola);
    res.render("maqolaView", {
        layout: "layout",
        maqolaTitle: maqola.maqolaTitle,
        maqolaText: maqola.maqolaText,
        img: maqola.img,
        maqola

    });
});
router.get("/tanlangan/:id", async function (req, res, next) {
    const maqola = await Maqola.findById(req.params.id)
    console.log(maqola);
    res.render("partials/tanlangan", {
        layout: "layout",
        maqolaTitle: maqola.maqolaTitle,
        maqolaText: maqola.maqolaText,
        img: maqola.img,
        maqola

    });
});


router.get('/korish/:id', async (req, res) => {
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
    res.render('/faqatMaqolalar', {
      header: categoryTitle,
      layout: 'layout',
      products
    })
  
  
  })





module.exports = router