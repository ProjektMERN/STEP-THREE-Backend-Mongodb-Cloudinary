const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        cim: {
            type: String,
            required: true,
        },
        szerzok: [
            {
                type: String,
                required: true,
            },
        ],
        zsaner: {
            type: String,
            required: true,
        },
        oldalszam: {
            type: Number,
            required: true,
        },
        tartalom: {
            type: String,
            required: true,
        },
        ar: {
            type: Number,
            required: true,
        },
        peldanySzam: {
            type: Number,
            required: true,
        },
        eladott: {
            type: Number,
            default: 0,
            required: true,
        },
        kedvezmeny: {
            type: Number,
            default: 0,
            required: true,
        },
        kep: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const BookModel = mongoose.model('book', bookSchema);

module.exports = BookModel;
