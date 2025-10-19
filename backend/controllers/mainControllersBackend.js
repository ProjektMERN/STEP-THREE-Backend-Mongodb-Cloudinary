const { zsanerek, kedvezmenyek } = require('../public/js/adatok');

exports.getMainBackend = (req, res) => {
    try {
        res.statusCode = 200;
        return res.render('index.ejs', { zsanerek, kedvezmenyek });
    } catch (error) {
        res.statusCode = 500;
        return res.render('404.ejs');
    }
};
