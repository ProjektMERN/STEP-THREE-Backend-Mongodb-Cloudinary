const Book = require('../models/Book');
const { zsanerek, kedvezmenyek } = require('../public/js/adatok');

exports.getAllBooksFrontend = async (req, res) => {
    try {
        const books = await Book.find({});
        res.statusCode = 200;
        return res.json({ books, zsanerek, kedvezmenyek });
    } catch (error) {
        res.statusCode = 500;
        return res.json({ msg: 'Valami hiba történt!' });
    }
};
