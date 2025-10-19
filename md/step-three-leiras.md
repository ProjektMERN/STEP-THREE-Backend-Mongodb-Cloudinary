# Backend konfiguráció

## `MongoDb` beállítása

-   [ ] Hozzunk létre a megismert módon egy `MongoDb` adatbázist `Konyvesbolt` néven a <a href="https://www.mongodb.com/">MongoDb</a> felületen.

---

-   [ ] A `utils` mappában hozzunk létre egy `dbConnection.js` nevű állományt.

```
> cd backend
> cd utils
> touch dbConnection.js
```

### `dbConnection.js` állomány:

```
const mongoose = require('mongoose');

const dbConnect = async () => {
    const connect = await mongoose.connect(process.env.DBSTRING);
    return connect;
};

module.exports = dbConnect;
```

### `.env` állomány módosítása:

```
PORT=3500
DBSTRING=mongodb+srv://pepe:pepe@webshop.3pmpvmm.mongodb.net/Konyvesbolt
```

### `server.js` állomány módosítása:

```
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

// adatbázis csatlakozás
const dbConnect = require('./utils/dbConnection');

dbConnect()
    .then(() => {
        console.log('Sikeres adatbázis csatlakozás!');
        // szerver figyelő módba állítása, hogy figyelje az adott
        // portszámon érkező request-eket
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Hiba: ' + error.msg);
    });

// route-ok kezelése
app.use('/', require('./routes/mainRoutesBackend'));

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
```

## Könyv modell (Book)

-   [ ] A `public/js` mappában hozzunk létre egy `adatok.js` állományt.

```
> cd backend
> cd public
> cd js
> touch adatok.js
```

### `adatok.js` állomány szerkesztése:

```
let zsanerek = ['sci-fi', 'fantasy', 'krimi', 'szerelmes'];
let kedvezmenyek = [0, 10, 20, 30];

module.exports = { zsanerek, kedvezmenyek };
```

---

-   [ ] A `models` mappában hozzunk létre egy `Book.js` állományt.

```
> cd backend
> cd models
> touch Book.js
```

### `Book.js` állomány szerkesztése:

```
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
```

### `/api/books-backend route` kezelése

-   [ ] Hozzunk létre a `controllers` mappában egy `booksControllersBackend.js` állományt és szerkesszük.

```
> cd backend
> cd controllers
> touch booksControllersBackend.js
```

### `booksControllersBackend.js` szerkesztése

```
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
```

---

-   [ ] Hozzunk létre a `routes` mappában egy `booksRoutesBackend.js` állományt és szerkesszük.

```
> cd backend
> cd routes
> touch booksRoutesBackend.js
```

### `booksRoutesBackend.js` szerkesztése

```
const express = require('express');
const {
    getAllBooksBackend,
} = require('../controllers/booksControllersBackend');
const router = express.Router();

router.get('/', getAllBooksBackend);

module.exports = router;
```

### `server.js` szerkesztése

```
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

```

---

-   [ ] Hozzunk létre a `views` mappában egy `books.ejs` és egy `nav.ejs` állományt.

```
> cd backend
> cd views
> touch books.ejs nav.ejs
```

### `books.ejs` szerkesztése

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        />
        <link
            rel="stylesheet"
            href="/css/books.css"
        />
        <title>Könyvek backend</title>
    </head>
    <body>
        <%- include('nav.ejs') %>
        <div id="books-kontener">
            <h1>Könyvek</h1>
            <p><a href="/api/new-book">Új könyv felvétele</a></p>
            <div id="konyvek">
                <% books.forEach(elem => { %>
                <div class="konyv">
                    <table>
                        <tr>
                            <td>Cím:</td>
                            <td><%= elem.cim %></td>
                        </tr>
                        <tr>
                            <td>Szerzők:</td>
                            <td>
                                <% elem.szerzok.forEach(item => { %>
                                <span><%= item %></span><br />
                                <% }) %>
                            </td>
                        </tr>
                        <tr>
                            <td>Zsáner:</td>
                            <td><%= elem.zsaner %></td>
                        </tr>
                        <tr>
                            <td>Oldalszám:</td>
                            <td><%= elem.oldalszam %></td>
                        </tr>
                        <tr>
                            <td>Tartalom:</td>
                            <td><%= elem.tartalom %></td>
                        </tr>
                        <tr>
                            <td>Ár:</td>
                            <td><%= elem.ar %> Ft</td>
                        </tr>
                        <tr>
                            <td>Példányszám:</td>
                            <td><%= elem.peldanySzam %> db</td>
                        </tr>
                        <tr>
                            <td>Eladott:</td>
                            <td><%= elem.eladott %> db</td>
                        </tr>
                        <tr>
                            <td>Kedvezmény:</td>
                            <td><%= elem.kedvezmeny %>%</td>
                        </tr>
                        <tr>
                            <td>Kép:</td>
                            <td>
                                <img src="<%= elem.kep %>" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a
                                    class="modosit"
                                    href="/api/books-backend/<%= elem._id %>"
                                >
                                    Módosítás
                                </a>
                            </td>
                            <td>
                                <button
                                    class="torol"
                                    onclick="torles('<%= elem._id%>')"
                                >
                                    Törlés
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
                <% }) %>
            </div>
        </div>
        <script src="/js/konyv-kezel.js"></script>
    </body>
</html>
```

### `books.css` szerkesztése

```
@import url('./alap.css');
@import url('./nav.css');

#books-kontener {
    margin: auto;
    width: 80%;
}

#books-kontener a {
    color: var(--kek);
}

#konyvek {
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 1em;
    margin-top: 1em;
}

.konyv {
    border: 1px solid #999;
    padding: 0.5em;
}

.konyv td {
    border: 1px solid var(--sotetszurke);
    padding: 0.5em;
}

.konyv img {
    width: 100%;
    height: 300px;
    object-fit: contain;
}

.konyv button {
    color: whitesmoke;
    border: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
    font-size: 1em;
    padding: 1em;
}

.modosit {
    background-color: green;
    color: whitesmoke !important;
    font-size: 1em;
    padding: 1em;
    text-decoration: none;
}


.torol {
    background-color: red;
}

```

### `nav.ejs` szerkesztése

```
<nav>
    <li><a href="/api">Főoldal</a></li>
    <li><a href="/api/books-backend">Könyvek</a></li>
</nav>
```

### `nav.css` szerkesztése

```
nav {
    background-color: var(--kek);
    display: flex;
    flex-direction: row;
    gap: 1em;
    list-style-type: none;
    width: 100%;
}

nav li a {
    color: var(--feher);
    display: block;
    padding: 1em;
    text-decoration: none;
    width: 100%;
}
```

### `index.ejs` szerkesztése

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        />
        <link
            rel="stylesheet"
            href="/css/main.css"
        />
        <title>Könyvesbolt webshop szerver oldala</title>
    </head>
    <body>
        <%- include('nav.ejs') %>
        <div id="main-kontener">
            <h1>Könyvesbolt webshop szerver oldala</h1>
        </div>
    </body>
</html>
```

### `main.css` szerkesztése

```
@import url('./alap.css');
@import url('./nav.css');

#main-kontener {
    margin: auto;
    width: 80%;
}
```

## `/api/new-book route` kezelése

-   [ ] Hozzunk létre a `controllers` mappában egy `newBookControllersBackend.js` állományt és szerkesszük.

```
> cd backend
> cd controllers
> touch newBookControllersBackend.js
```

### `newBookControllersBackend.js` szerkesztése

```
const Book = require('../models/Book');

exports.getNewBookBackend = (req, res) => {
    try {
        res.statusCode = 200;
        return res.render('new-book.ejs');
    } catch (error) {
        res.statusCode = 500;
        return res.render('404.ejs');
    }
};
```

---

-   [ ] Hozzunk létre a `routes` mappában egy `newBookRoutesBackend.js` állományt és szerkesszük.

```
> cd backend
> cd routes
> touch newBookRoutesBackend.js
```

### `newBookRoutesBackend.js` szerkesztése

```
const express = require('express');
const {
    getNewBookBackend,
} = require('../controllers/newBookControllersBackend');
const router = express.Router();

router.get('/', getNewBookBackend);

module.exports = router;
```

### `server.js` szerkesztése

```
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

```

---

-   [ ] Hozzunk létre a `views` mappában egy `new-book.ejs` állományt.

```
> cd backend
> cd views
> touch new-book.ejs
```

### `new-book.ejs` szerkesztése

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        />
        <link
            rel="stylesheet"
            href="/css/new-book.css"
        />
        <title>Új könyv felvétele</title>
    </head>
    <body>
        <%- include('nav.ejs') %>
        <div id="new-book-kontener">
            <h1>Új könyv felvétele</h1>
            <form>
                <table>
                    <tr>
                        <td>Cím:</td>
                        <td>
                            <input
                                type="text"
                                id="cim"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Szerzők:</td>
                        <td>
                            <input
                                type="text"
                                id="szerzok"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Zsáner:</td>
                        <td>
                            <select id="zsaner">
                                <% for( let i = 0; i < zsanerek.length; i++ ) {
                                %>
                                <option value="<%= zsanerek[i] %>">
                                    <%= zsanerek[i] %>
                                </option>
                                <% } %>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Oldalszám:</td>
                        <td>
                            <input
                                type="number"
                                id="oldalszam"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Tartalom:</td>
                        <td>
                            <textarea
                                rows="10"
                                cols="100"
                                id="tartalom"
                            ></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Ár:</td>
                        <td>
                            <input
                                type="number"
                                id="ar"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Példányszám:</td>
                        <td>
                            <input
                                type="number"
                                id="peldanySzam"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Kedvezmény:</td>
                        <td>
                            <select id="kedvezmeny">
                                <% for( let i = 0; i < kedvezmenyek.length; i++
                                ) { %>
                                <option value="<%= kedvezmenyek[i] %>">
                                    <%= kedvezmenyek[i] %>
                                </option>
                                <% } %>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Kép:</td>
                        <td>
                            <input
                                type="text"
                                id="kep"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onclick="letrehoz(event)">Létrehoz</button>
                        </td>
                        <td></td>
                    </tr>
                </table>
            </form>
        </div>
        <script src="/js/letrehoz.js"></script>
    </body>
</html>
```

### `new-book.css` szerkesztése

```
@import url('./alap.css');
@import url('./nav.css');

#new-book-kontener {
    margin: auto;
    width: 80%;
}

.konyv {
    border: 1px solid #999;
    padding: 0.5em;
}

#new-book-kontener td {
    padding: 0.5em;
}

#new-book-kontener input {
    font-size: larger;
    width: 400px;
}

#new-book-kontener button {
    color: whitesmoke;
    background-color: green;
    border: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
    padding: 1em;
}
```

---

-   [ ] Hozzunk létre a `public` mappában egy `js` mappát és azon belül egy `letrehoz.js` állományt.

```
> cd backend
> cd public
> mkdir js
> cd js
> touch letrehoz.js
```

### `letrehoz.js` szerkesztése

```
async function letrehoz(event) {
    event.preventDefault();
    const cim = document.querySelector('#cim').value;
    const szerzok = document.querySelector('#szerzok').value;
    const zsaner = document.querySelector('#zsaner').value;
    const oldalszam = document.querySelector('#oldalszam').value;
    const tartalom = document.querySelector('#tartalom').value;
    const ar = document.querySelector('#ar').value;
    const peldanySzam = document.querySelector('#peldanySzam').value;
    const kep = document.querySelector('#kep').value;

    const response = await fetch('/api/new-book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cim,
            szerzok,
            zsaner,
            oldalszam,
            tartalom,
            ar,
            peldanySzam,
            kep,
        }),
    });

    console.log(response);

    if (response.ok) {
        const resp = await response.json();
        window.alert(resp.msg);
        window.location.href = '/api/books-backend';
    }
}
```

### `newBookControllersBackend.js` szerkesztése

```
const Book = require('../models/Book');
const { zsanerek, kedvezmenyek } = require('../public/js/adatok');

exports.getNewBookBackend = (req, res) => {
    try {
        res.statusCode = 200;
        return res.render('new-book.ejs', { zsanerek, kedvezmenyek });
    } catch (error) {
        res.statusCode = 500;
        return res.render('404.ejs');
    }
};

exports.postNewBookBackend = async (req, res) => {
    try {
        const {
            cim,
            szerzok,
            zsaner,
            oldalszam,
            tartalom,
            ar,
            peldanySzam,
            kedvezmeny,
            kep,
        } = req.body;

        const irok = szerzok.split(',');

        const newBook = new Book({
            cim,
            szerzok: irok,
            zsaner,
            oldalszam,
            tartalom,
            ar,
            peldanySzam,
            kedvezmeny,
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
```

### `newBookRoutesBackendjs` szerkesztése

```
const express = require('express');
const {
    getNewBookBackend,
    postNewBookBackend,
} = require('../controllers/newBookControllersBackend');
const router = express.Router();

router.get('/', getNewBookBackend);
router.post('/', postNewBookBackend);

module.exports = router;
```

## Könyv törlése az adatbázisból

-   [ ] Hozzunk létre a `js` mappában és azon belül egy `konyv-kezel.js` állományt.

```
> cd backend
> cd public
> cd js
> touch konyv-kezel.js
```

### `konyv-kezel.js` szerkesztése

```
async function torles(id) {
    const response = await fetch(`/api/books-backend/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        window.alert('Sikeres törlés!');
        window.location.href = '/api/books-backend';
    }
}
```

### `booksControllersBackend.js` szerkesztése

```
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
```

### `booksRoutesBackend.js` szerkesztése

```
const express = require('express');
const {
    getAllBooksBackend,
    deleteOneBookBackend,
} = require('../controllers/booksControllersBackend');
const router = express.Router();

router.get('/', getAllBooksBackend);
router.delete('/:id', deleteOneBookBackend);

module.exports = router;
```

## Könyv módosítása az adatbázisban

-   [ ] Hozzunk létre a `views` mappában egy `book.ejs` állományt.

```
> cd backend
> cd views
> touch book.ejs
```

### `book.ejs` szerkesztése

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        />
        <link
            rel="stylesheet"
            href="/css/book.css"
        />
        <title>Egy könyv módosítása</title>
    </head>
    <body>
        <%- include('nav.ejs') %>
        <div id="book-kontener">
            <h1>Egy könyv módosítása</h1>
            <form>
                <table>
                    <tr>
                        <td>Cím:</td>
                        <td>
                            <input
                                type="text"
                                id="cim"
                                value="<%= book.cim %>"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Szerzők:</td>
                        <td>
                            <input
                                type="text"
                                id="szerzok"
                                value="<%= book.szerzok %>"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Zsáner:</td>
                        <td>
                            <select id="zsaner">
                                <% for( let i = 0; i < zsanerek.length; i++ ) {
                                %> <% if (book.zsaner === zsanerek[i]) { %>
                                <option
                                    value="<%= zsanerek[i] %>"
                                    selected
                                >
                                    <%= zsanerek[i] %>
                                </option>
                                <% } else { %>
                                <option value="<%= zsanerek[i] %>">
                                    <%= zsanerek[i] %>
                                </option>
                                <% } %> <% } %>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Oldalszám:</td>
                        <td>
                            <input
                                type="number"
                                id="oldalszam"
                                value="<%= book.oldalszam %>"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Tartalom:</td>
                        <td>
                            <textarea
                                rows="10"
                                cols="100"
                                id="tartalom"
                            >
<%= book.tartalom %></textarea
                            >
                        </td>
                    </tr>
                    <tr>
                        <td>Ár:</td>
                        <td>
                            <input
                                type="number"
                                id="ar"
                                value="<%= book.ar %>"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Példányszám:</td>
                        <td>
                            <input
                                type="number"
                                id="peldanySzam"
                                value="<%= book.peldanySzam %>"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Zsáner:</td>
                        <td>
                            <select id="kedvezmeny">
                                <% for( let i = 0; i < kedvezmenyek.length; i++
                                ) { %> <% if (book.kedvezmeny ===
                                kedvezmenyek[i]) { %>
                                <option
                                    value="<%= kedvezmenyek[i] %>"
                                    selected
                                >
                                    <%= kedvezmenyek[i] %>
                                </option>
                                <% } else { %>
                                <option value="<%= kedvezmenyek[i] %>">
                                    <%= kedvezmenyek[i] %>
                                </option>
                                <% } %> <% } %>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>Kép:</td>
                        <td>
                            <input
                                type="text"
                                id="kep"
                                value="<%= book.kep %>"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onclick="modosit(event, '<%= book._id %>')">
                                Módosít
                            </button>
                        </td>
                        <td></td>
                    </tr>
                </table>
            </form>
        </div>
        <script src="/js/konyv-modosit.js"></script>
    </body>
</html>
```

### `book.css` szerkesztése

```
@import url('./alap.css');
@import url('./nav.css');

#book-kontener {
    margin: auto;
    width: 80%;
}

.konyv {
    border: 1px solid #999;
    padding: 0.5em;
}

#book-kontener td {
    padding: 0.5em;
}

#book-kontener input {
    font-size: larger;
    width: 400px;
}

#book-kontener button {
    color: whitesmoke;
    background-color: green;
    border: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
    padding: 1em;
}

```

---

-   [ ] Hozzunk létre a `js` mappában egy `konyv-modosit.js` állományt.

```
> cd backend
> cd public
> cd js
> touch konyv-modosit.js
```

### `konyv-modosit.js` szerkesztése

```
async function modosit(event, id) {
    event.preventDefault();
    const cim = document.querySelector('#cim').value;
    const szerzok = document.querySelector('#szerzok').value;
    const zsaner = document.querySelector('#zsaner').value;
    const oldalszam = document.querySelector('#oldalszam').value;
    const tartalom = document.querySelector('#tartalom').value;
    const ar = document.querySelector('#ar').value;
    const peldanySzam = document.querySelector('#peldanySzam').value;
    const kedvezmeny = document.querySelector('#kedvezmeny').value;
    const kep = document.querySelector('#kep').value;

    const response = await fetch(`/api/books-backend/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cim,
            szerzok,
            zsaner,
            oldalszam,
            tartalom,
            ar,
            peldanySzam,
            kedvezmeny,
            kep,
        }),
    });

    if (response.ok) {
        const resp = await response.json();
        window.alert(resp.msg);
        window.location.href = '/api/books-backend';
    }
}
```

### `booksControllersBackend.js` szerkesztése

```
const Book = require('../models/Book');
const { zsanerek, kedvezmenyek } = require('../public/js/adatok');

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

        res.statusCode = 200;
        return res.render('book.ejs', { book, zsanerek, kedvezmenyek });
    } catch (error) {
        res.statusCode = 500;
        return res.render('404.ejs');
    }
};

exports.updateOneBookBackend = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            cim,
            szerzok,
            zsaner,
            oldalszam,
            tartalom,
            ar,
            peldanySzam,
            kedvezmeny,
            kep,
        } = req.body;
        const irok = szerzok.split(',');
        const book = await Book.findByIdAndUpdate(
            { _id: id },
            {
                cim,
                szerzok: irok,
                zsaner,
                oldalszam,
                tartalom,
                ar,
                peldanySzam,
                kedvezmeny,
                kep,
            }
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
```

### `booksRoutesBackend.js` szerkesztése

```
const express = require('express');
const {
    getAllBooksBackend,
    deleteOneBookBackend,
    getOneBookBackend,
    updateOneBookBackend,
} = require('../controllers/booksControllersBackend');
const router = express.Router();

router.get('/', getAllBooksBackend);
router.get('/:id', getOneBookBackend);
router.put('/:id', updateOneBookBackend);
router.delete('/:id', deleteOneBookBackend);

module.exports = router;
```

# Szűrés
