# Frontend konfiguráció

## Parancsori lépések 1.rész

-   [ ] Hozzunk létre a `frontend` nevű mappát. Ehhez használjuk a `Vite` frontend építő eszközt a `Konyvesbolt` mappában.

```
> cd Konyvesbolt
> npm install vite@latest
```

### `frontend` mappa létrehozása:

```
$ npm create vite@latest

> npx
> create-vite

|
o  Project name:
|  frontend
|
o  Select a framework:
|  React
|
o  Select a variant:
|  JavaScript
|
o  Use rolldown-vite (Experimental)?:
|  No
|
o  Install with npm and start now?
|  Yes
|
o  Scaffolding project in C:\Users\Peter\Desktop\MERN\STEP-TWO-Frontend-Config\frontend...
|
o  Installing dependencies with npm...

added 199 packages, and audited 200 packages in 36s

32 packages are looking for funding

  VITE v7.1.9  ready in 715 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

-   [ ] Ha valamiért újra kellene indítani az alkalmazást, akkor

```
> cd frontend
> npm run dev
```

---

-   [ ] A projekt során használandó legfőbb `npm csomag` telepítése a `frontend` oldalon.

```
> cd frontend
> npm install react-router-dom
```

## Mappastruktúra szerkesztése

-   [ ] Az `index.html` állományban írjuk át a címet. **Máshoz ne nyúljunk!**

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link
            rel="icon"
            type="image/svg+xml"
            href="/vite.svg"
        />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        />
        <title>Könyvesbolt frontend oldal</title>
    </head>
    <body>
        <div id="root"></div>
        <script
            type="module"
            src="/src/main.jsx"
        ></script>
    </body>
</html>
```

---

-   [ ] A `public` mappából töröljük a `vite.svg` állományt. Az `src` mappából az `assets` mappát. Törölhetjük az `App.css` állományt is. Az `index.css` tartalmát átírjuk.

---

-   [ ] Szerkesszük a `main.jsx` állományt.

Előtte.

```
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
```

Utánna.

```
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
```

### `index.css` állomány:

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
```

---

-   [ ] Szerkesszük az `App.jsx` állományt.

Előtte.

```
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                <a
                    href="https://vite.dev"
                    target="_blank"
                >
                    <img
                        src={viteLogo}
                        className="logo"
                        alt="Vite logo"
                    />
                </a>
                <a
                    href="https://react.dev"
                    target="_blank"
                >
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
```

Utánna.

```
function App() {
    return (
        <>
            <h1>Könyvesbolt frontend oldal</h1>
        </>
    );
}

export default App;
```

## Oldalak (pages) és komponensek (components)

-   [ ] Az `src` mappában hozzunk létre két mappát `pages` és `components` néven.

```
> cd frontend
> cd src
> mkdir pages components
```

---

-   [ ] A `pages` mappában hozzunk létre egy mappát `Home` néven. Majd ezen belül két állományt `Home.jsx` és `Home.css` néven.

```
> cd frontend
> cd src
> cd pages
> mkdir Home
> cd Home
> touch Home.jsx Home.css
```

### `Home.jsx` szerkesztése:

```
const Home = () => {
    return (
        <div className="home-kontener">
            <h1>Home</h1>
        </div>
    );
};

export default Home;
```

### `Home.css` szerkesztése:

```
.home-kontener {
    margin: auto;
    width: 80%;
}

.home-kontener h1 {
    color: red;
}
```

---

-   [ ] Az `App.jsx` állományban állítsuk be a `route`-ok kezelését.

```
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';

function App() {
    return (
        <div className="app-kontener">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
```

### `index.css` szerkesztése:

```
@import url('./pages/Home/Home.css');

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

.app-kontener {
    width: 100%;
}
```

---

-   [ ] A `components` mappában hozzunk létre egy mappát `Navbar` néven. Majd ezen belül két állományt `Navbar.jsx` és `Navbar.css` néven.

```
> cd frontend
> cd src
> cd components
> mkdir Navbar
> cd Navbar
> touch Navbar.jsx Navbar.css
```

### `Navbar.jsx` szerkesztése:

```
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar-kontener">
            <Link to="/">Home</Link>
        </div>
    );
};

export default Navbar;
```

### `Navbar.css` szerkesztése:

```
.navbar-kontener {
    background-color: blue;
    padding: 1em;
}

.navbar-kontener a {
    color: whitesmoke;
    cursor: pointer;
    text-decoration: none;
}
```

---

-   [ ] Az `App.jsx` állományban állítsuk be a `Navbar` komponenst.

```
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';

function App() {
    return (
        <div className="app-kontener">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
```

### `index.css` szerkesztése:

```
@import url('./pages/Home/Home.css');
@import url('./components/Navbar/Navbar.css');

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

.app-kontener {
    width: 100%;
}
```
