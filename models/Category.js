const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
    categoryTitle:{
        type: String,
        required: true
    }
})

module.exports = model('category',CategorySchema)