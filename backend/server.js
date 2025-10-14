// npm csomagok kezelése
require('dotenv').config();
const express = require('express');

// node.js csomagok kezelése
const path = require('node:path');

// szerver létrehozása
const app = express();
const PORT = process.env.PORT || 3500;

// midleware-k
// statikus állományok (css, böngészőbeli js, képek stb.) mappája
app.use(express.static(path.join(__dirname, 'public')));
// ejs megjelenítő motor beállítása
app.set('view engine', 'ejs');
// json állományok feldolgozása
app.use(express.json());

// adatbázis csatlakozás
const dbConnect = require('./utils/dbConnection');

dbConnect()
    .then(() => {
        console.log('Sikeres adatbázis csatlakozás!');
        // szerver figyelő módba állítása, hogy figyelje az adott
        // portszámon érkező request-eket
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}/api`);
        });
    })
    .catch((error) => {
        console.log('Hiba: ' + error.msg);
    });

// route-ok kezelése
app.use('/api', require('./routes/mainRoutesBackend'));
app.use('/api/books-backend', require('./routes/booksRoutesBackend'));
app.use('/api/new-book', require('./routes/newBookRoutesBackend'));

// nem létező route-ok kezelése, mindig ez legyen az utolsó
app.use((req, res) => {
    try {
        res.statusCode = 404;
        return res.render('404.ejs');
    } catch (error) {
        res.statusCode = 500;
        return res.json({ msg: 'Általános szerver hiba!' });
    }
});
