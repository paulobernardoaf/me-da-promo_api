const mongoose = require('mongoose');

const PromotionSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    company: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Products', ProductSchema);