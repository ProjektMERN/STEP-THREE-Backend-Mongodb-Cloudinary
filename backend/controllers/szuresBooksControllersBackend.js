const Book = require('../models/Book');
const { zsanerek, kedvezmenyek } = require('../public/js/adatok');

exports.getSzuresAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.statusCode = 200;
        return res.render('books.ejs', { books });
    } catch (error) {
        res.statusCode = 500;
        return res.render('404.ejs');
    }
};

exports.getSzuresBooks = async (req, res) => {
    try {
        const { id } = req.params;
        const booksLekert = await Book.find({});
        const adat = JSON.parse(id);
        const zsanerKedvezmeny = adat.szuresek;
        let books = [];

        booksLekert.forEach((elem) => {
            let vanE = false;
            zsanerKedvezmeny[0].forEach((item) => {
                if (elem.zsaner === item) {
                    zsanerKedvezmeny[1].forEach((element) => {
                        if (elem.kedvezmeny === element) vanE = true;
                    });
                }
            });

            if (vanE) books.push(elem);
        });

        res.statusCode = 200;
        return res.render('books.ejs', {
            books,
            zsanerek,
            kedvezmenyek,
        });
    } catch (error) {
        res.statusCode = 500;
        return res.render('404.ejs');
    }
};
