
import { useState, useEffect } from "react";



const Book = ({ book, onUpdateBook }) => {
    const [shelf, setShelf] = useState(''); 

    useEffect(() => {
        if ('shelf' in book) 
            setShelf(book.shelf);
        else
            setShelf('none');
      }, [book]); 

    const handleChange = (e) => {
        
        setShelf(e.target.value);
        onUpdateBook(book, e.target.value);
    }

    return (
        
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                        width: 128,
                        height: 174,
                        backgroundImage: book.imageLinks ? 'url("' + book.imageLinks.thumbnail + '")' : 'none',
                        }}
                    ></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={handleChange}>
                        <option value="none" disabled>
                            {shelf === "none" ? 'Add to...' : 'Move to...'}
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        {shelf !== 'none' && <option value="none">None</option>}
                        </select>
                    </div>
                </div>
                <div className="book-title">
                {'title' in book && book.title}
                </div>
                {'authors' in book && <div className="book-authors">{book.authors.join("")}</div>}
            </div>
       

    )
};

export default Book;