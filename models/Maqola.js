const { Schema, model } = require('mongoose')

const maqolaSchema = new Schema({
    maqolaTitle: {
        type: String,
        required: true
    },
    maqolaText: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    categoryId: {
        ref: 'category',
        type: Schema.Types.ObjectId
    },

})

module.exports = model('maqola', maqolaSchema)