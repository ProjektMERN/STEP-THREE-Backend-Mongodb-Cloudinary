import './Book.css';

const Book = ({ book }) => {
    const szerzok = book.szerzok.join(' - ');

    const megnez = () => {};

    return (
        <div className="book-container">
            <p>{szerzok}</p>
            <h4>{book.cim}</h4>
            <img
                src={book.kep}
                alt={book.cim}
            />
            {book.kedvezmeny !== 0 ? (
                <>
                    <p>
                        Eredeti ár: <del>{book.ar} Ft</del>
                    </p>
                    <p>
                        Ár:{' '}
                        {(book.ar - (book.ar * book.kedvezmeny) / 100).toFixed(
                            0
                        )}{' '}
                        Ft
                    </p>
                </>
            ) : (
                <>
                    <p>Eredeti ár: {book.ar} Ft</p>
                    <p>Ár: {book.ar} Ft</p>
                </>
            )}
            <button onClick={megnez()}>Megnézem</button>
        </div>
    );
};

export default Book;
