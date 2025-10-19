import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar-kontener">
            <Link to="/">Home</Link>
            <Link to="/books">Könyvek</Link>
        </div>
    );
};

export default Navbar;
