import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Books from './pages/Books/Books';

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
                    <Route
                        path="/books"
                        element={<Books />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
