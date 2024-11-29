const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    price: {
        type: Number,
    },
    category: {
        type: String,
    },
    rating: {
        type: Number,
    },
    affiliateLink: {
        type: String,
    },
    featured: {
        type: Boolean,
        default: false
    },
    specifications: {
        type: Object
    },
    highlights: [
        {
            type: String,
        }
    ]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;