const Book = require('../models/Book');

exports.getAllBooksBackend = async (req, res) => {
    try {
        const books = await Book.find({});
        res.statusCode = 200;
        return res.render('books.ejs', { books });
    } catch (error) {
        res.statusCode = 500;
        return res.render('404.ejs');
    }
};

exports.getOneBookBackend = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById({ _id: id });
        console.log(book);

        res.statusCode = 200;
        return res.render('book.ejs', { book });
    } catch (error) {
        res.statusCode = 500;
        return res.render('404.ejs');
    }
};

exports.updateOneBookBackend = async (req, res) => {
    try {
        const { id } = req.params;
        const { cim, szerzok, oldalszam, tartalom, ar, kep } = req.body;
        const irok = szerzok.split(',');
        const book = await Book.findByIdAndUpdate(
            { _id: id },
            { cim, szerzok: irok, oldalszam, tartalom, ar, kep }
        );

        res.statusCode = 200;
        return res.json({ msg: 'Sikeres módosítás!' });
    } catch (error) {
        res.statusCode = 500;
        return res.json({ msg: 'Valami hiba történt!' });
    }
};

exports.deleteOneBookBackend = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete({ _id: id });

        res.statusCode = 204;
        return res.json({ msg: 'Sikeres törlés!' });
    } catch (error) {
        res.statusCode = 500;
        return res.json({ msg: 'Valami hiba történt!' });
    }
};
