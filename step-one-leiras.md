# Backend konfiguráció

## Parancsori lépések 1.rész

-   [ ] Hozzunk létre egy `Konyvesbolt` nevű mappát. Hozzuk létre a `Konyvesbolt` mappában a `backend` mappát.

```
> mkdir Konyvesbolt
> cd Konyvesbolt
> mkdir backend
> cd backend
```

---

-   [ ] Egy új `Node.js projekt` indításakor az első dolgok egyike, amit tenned kell, egy `package.json` fájl létrehozása. Ez a fájl kulcsfontosságú információkat tartalmaz a projektedről, például a függőségeit (dependencies), szkriptjeit, verzióját és egyebeket. Általában az `npm init` parancsot használják ennek a fájlnak a létrehozására, de mi van, ha ki szeretnéd hagyni a fárasztó promptokat, és gyorsan be szeretnéd állítani? Add meg az `npm init -y` parancsot!
        Az `npm init -y` egy rövidített parancs, amely gyorsan létrehoz egy `package.json` fájlt a `Node.js projektkönyvtárában` felhasználói beavatkozás nélkül. A parancs minden kérdésre „igen”-nel válaszol, és kitölti az alapértelmezett értékeket, így időt takarít meg, amikor még csak most kezded a projektet.

```
> npm init -y
```

---

-   [ ] Alap `package.json` állomány.

```
{
    "name": "backend",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "type": "commonjs"
}
```

Írjunk át néhány dolgot.

```
{
    "name": "backend",
    "version": "1.0.0",
    "description": "Könyvesbolt szerveroldali része.",
    "main": "server.js",
    "scripts": {
        "dev": "nodemon server.js",
        "start": "node server.js"
    },
    "keywords": [
        "express",
        "ejs",
        "cloudinary"
    ],
    "author": "SZBI Szeged 13/a",
    "license": "MIT",
    "type": "commonjs"
}
```

---

-   [ ] Hozzuk létre a következő mappákat és állományokat a `backend` mappában.

```
> mkdir models views routes controllers public utils middlewares
> touch server.js .env .gitignore
```

### Mappák:

-   `models`: adatbázis modellekhez
-   `views`: ejs oldalakhoz
-   `routes`: erőforrás elérésekhez
-   `controllers`: CRUD műveletek kidolgozásához
-   `public`: statikus állományokhoz
-   `utils`: alkalmazás működését segítő állományokhoz
-   `middlewares`: request és response közötti műveletekhez

### Állományok:

-   `server.js`: a szervert futtató állomány
-   `.env`: környezeti változók (portok, jelszavak, API-kulcsok stb.) kezelése
-   `.gitignore`: GitHub-ra fel nem töltendő dolgok

---

-   [ ] A projekt során használandó `npm csomagok` telepítése a `backend` oldalon.

```
> cd backend
> npm install bcrypt cloudinary cors dotenv ejs express mongoose
> npm install -D nodemon
```

### `npm` csomagok (`dependencies`):

-   `bcrypt`: adatok titkosításához
-   `cloudinar`: képek felhőalkalmazásban való kezeléséhez
-   `cors`: CORS problémák kezeléséhez
-   `dotenv`: `.env` állományban elhelyezett környezeti változók kezeléséhez
-   `ejs`: `ejs` állományok létrehozásához
-   `express`: a szerver kezeléséhez
-   `mongoose`: a `MongoDb` adatbázis kezeléséhez

### `npm` csomagok (`devDependencies`):

-   `nodemon`: a szerver folyamatos újraindításához

A módosított `package.json`.

```
{
    "name": "backend",
    "version": "1.0.0",
    "description": "Könyvesbolt szerveroldali része.",
    "main": "server.js",
    "scripts": {
        "dev": "nodemon server.js",
        "start": "node server.js"
    },
    "keywords": [
        "express",
        "ejs",
        "cloudinary"
    ],
    "author": "SZBI Szeged 13/a",
    "license": "MIT",
    "type": "commonjs",
    "dependencies": {
        "bcrypt": "^6.0.0",
        "cloudinary": "^2.7.0",
        "cors": "^2.8.5",
        "dotenv": "^17.2.3",
        "ejs": "^3.1.10",
        "express": "^5.1.0",
        "mongoose": "^8.19.1"
    },
    "devDependencies": {
        "nodemon": "^3.1.10"
    }
}
```

## `server.js`, `.env` és `.gitignore` szerkesztése 1.rész

-   [ ] Írjuk be a `server.js`-be a kezdő lépéseket.

```
// npm csomagok kezelése
require('dotenv').config();
const express = require('express');

// node.js csomagok kezelése
const path = require('node:path');

// szerver létrehozása
const app = express();
const PORT = process.env.PORT || 3500;

// szerver figyelő módba állítása, hogy figyelje az adott
// portszámon érkező request-eket
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
```

---

-   [ ] Írjuk be a `.env`-be a kezdő lépéseket.

```
PORT=3500
```

---

-   [ ] Írjuk be a `.gitignore`-ba a kezdő lépéseket.

```
node_modules
.env
package-lock.json
```

---

-   [ ] Futassuk a szervert a `Git Bash`-ből.

```
> cd backend
> npm run dev
```

## `main route` kezelése

-   [ ] Hozzunk létre a `controllers` mappában egy `mainControllersBackend.js` állományt és szerkesszük.

```
> cd controllers
> touch mainControllersBackend.js
```

## `mainControllersBackend.js` szerkesztése

```
exports.getMainBackend = (req, res) => {
    try {
        res.statusCode = 200;
        return res.render('index.ejs');
    } catch (error) {
        res.statusCode = 500;
        return res.render('404.ejs');
    }
};
```

---

-   [ ] Hozzunk létre a `routes` mappában egy `mainRoutesBackend.js` állományt és szerkesszük.

```
> cd routes
> touch mainRoutesBackend.js
```

## `mainRoutesBackend.js` szerkesztése

```
const express = require('express');
const { getMainBackend } = require('../controllers/mainControllersBackend');
const router = express.Router();

router.get('/', getMainBackend);

module.exports = router;
```

---

-   [ ] Hozzunk létre a `views` mappában egy `index.ejs` és egy `404.ejs` állományt és szerkesszük.

```
> cd views
> touch index.ejs 404.ejs
```

## `index.ejs` szerkesztése

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
        <div id="main-kontener">
            <h1>Könyvesbolt webshop szerver oldala</h1>
        </div>
    </body>
</html>
```

## `404.ejs` szerkesztése

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
            href="/css/404.css"
        />
        <title>404 Not Found Error!</title>
    </head>
    <body>
        <div id="not-found-kontener">
            <h1>404 Not Found Error!</h1>
            <p>A keresett erőforrás nem található!</p>
            <p><a href="/api">Vissza a főoldalra!</a></p>
        </div>
    </body>
</html>
```

---

-   [ ] Hozzunk létre a `public` mappában egy `css` mappát. Ezen belül az `alap.css`, `main.css` és `404.css` állományokat.

```
> cd public
> mkdir css
> cd css
> touch alap.css main.css 404.css
```

## `alap.css` szerkesztése

```
* {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
}

body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
}

:root {
    --kek: blue;
    --feher: whitesmoke;
    --sotetszurke: #333;
}

```

## `main.css` szerkesztése

```
@import url('./alap.css');

#main-kontener {
    margin: auto;
    width: 80%;
}
```

## `404.css` szerkesztése

```
@import url('./alap.css');

#not-found-kontener {
    align-items: center;
    background-color: var(--sotetszurke);
    color: var(--feher);
    display: flex;
    flex-direction: column;
    gap: 1em;
    height: 100vh;
    justify-content: center;
    width: 100vw;
}

#not-found-kontener a {
    color: var(--feher);
}
```

---

-   [ ] `server.js` további szerkesztése.

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

// szerver figyelő módba állítása, hogy figyelje az adott
// portszámon érkező request-eket
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

// route-ok kezelése
app.use('/', require('./routes/mainRoutesBackend'));
```

---

-   [ ] Nem létező `route`-ok kezelése. A `server.js` ismételt szerkesztése.

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

// szerver figyelő módba állítása, hogy figyelje az adott
// portszámon érkező request-eket
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
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
