const { Router } = require('express')
const router = Router()
const Maqola = require('../models/Maqola')
const fileUpload = require('../middleware/fileUpload')
const toDelete = require('../middleware/toDelete')
const Category = require('../models/Category')
const auth = require('../middleware/auth')



router.get('/add', auth, async (req, res) => {
    // const maqola = await Maqola.find()
    const categories = await Category.find()

    res.render('admin/maqolaCreate', {
        header: 'Maqola yaratish',
        title: 'Moqla',
        layout: 'main',
        // maqola
        categories
    })
})

router.get('/read', auth, async (req, res) => {
    const maqola = await Maqola.find()
    res.render('admin/maqola', {
        title: 'Maqola ',
        layout: 'main',
        header: 'Maqolani korish',
        maqola
    })
})
router.post('/add', auth, fileUpload.single('img'), async (req, res) => {
    const { maqolaTitle, maqolaText, categoryId } = req.body
    const img = req.file.filename
    console.log(img);

    const maqola = new Maqola({
        maqolaTitle,
        maqolaText,
        categoryId,
        img
    })

    await maqola.save()
    res.redirect('/admin/maqola/read')
})

router.get('/edit/:id', auth, async (req, res) => {
    const maqola = await Maqola.findById(req.params.id)

    res.render('admin/maqolaEdit', {
        layout: 'main',
        header: 'maqolani yangilash',
        title: 'O`zgartirish',
        maqola
    })
})

router.post('/edit/:id', auth, fileUpload.single('img'), async (req, res) => {
    const { img } = await Maqola.findById(req.params.id)
    const maqola = req.body

    console.log(img);

    if (req.file) {
        toDelete(img)
        maqola.img = req.file.filename
    }
    await Maqola.findByIdAndUpdate(req.params.id, maqola,)
    res.redirect('/admin/maqola/read')

})

router.get('/delete/:id', auth, async (req, res) => {
    const { img } = await Maqola.findById(req.params.id)
    await Maqola.findByIdAndDelete(req.params.id, req.body,)
    toDelete(img)
    res.redirect('/admin/maqola/read')
})


module.exports = router
