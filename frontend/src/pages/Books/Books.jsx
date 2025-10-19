import { useEffect, useState } from 'react';
import './Books.css';
import Book from '../../components/Book/Book';

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const konyvLeker = async () => {
            const response = await fetch(
                'http://localhost:3500/api/books-frontend'
            );

            const adat = await response.json();

            if (response.ok) {
                // console.log(adat.books);
                setBooks(adat.books);
            } else {
                window.alert(adat.msg);
            }
        };

        konyvLeker();
    }, []);

    return (
        <div className="books-kontener">
            <h1>Könyvek</h1>
            <div className="books-container">
                {books.map((elem) => {
                    return (
                        <Book
                            key={elem._id}
                            book={elem}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Books;
