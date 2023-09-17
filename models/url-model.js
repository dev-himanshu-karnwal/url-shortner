const mongoose = require('mongoose');
const validator = require('validator');

// Creating UrlSchema
const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: [true, 'Original URL not provided'],
        validate: {
            validator: validator.isURL,
            message: 'Not a valid original URL'
        },
        trim: true,
        unique: true
    },
    generatedId: {
        type: String,
        required: [true, 'Generated URL not provided'],
        unique: true
    },
    count: {
        type: Number,
        default: 0,
    }
});

// Setting index
urlSchema.index({ generatedUrl: 1 });

// creating model
const Url = mongoose.model('Url', urlSchema);

// exporting
module.exports = Url;