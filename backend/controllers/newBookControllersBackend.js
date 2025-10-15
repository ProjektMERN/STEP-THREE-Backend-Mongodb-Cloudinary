const Book = require('../models/Book');
const zsanerek = require('../public/js/adatok');

exports.getNewBookBackend = (req, res) => {
    try {
        res.statusCode = 200;
        return res.render('new-book.ejs', { zsanerek });
    } catch (error) {
        res.statusCode = 500;
        return res.render('404.ejs');
    }
};

exports.postNewBookBackend = async (req, res) => {
    try {
        const { cim, szerzok, zsaner, oldalszam, tartalom, ar, kep } = req.body;

        const irok = szerzok.split(',');

        const newBook = new Book({
            cim,
            szerzok: irok,
            zsaner,
            oldalszam,
            tartalom,
            ar,
            kep,
        });

        await newBook.save();

        res.statusCode = 201;
        return res.json({ msg: 'Sikeres feltöltés!' });
    } catch (error) {
        res.statusCode = 500;
        return res.json({ msg: 'Valami hiba történt!' });
    }
};
