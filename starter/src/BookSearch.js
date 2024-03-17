import Book from "./Book.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI.js";


let filterTimeout; 

const BookSearch = ({books,onUpdateBook })=>{

  const [query, setQuery] = useState("");

  const [resBooks, setResbooks] = useState([]);

  const updateQuery = (query)=>{
    setQuery(query);

    const bookSearchResult = async()=>{
      if (query.length === 0){
        setResbooks([]);
      }
      else{
        const res = await BooksAPI.search(query);
        if (res.error)
            setResbooks([]);
        else
        {
            const finalRes = res.map(resBook => {
                books.forEach(book => {
                    if (book.id === resBook.id)
                        resBook.shelf = book.shelf;
                });
                return resBook;
            });
            setResbooks(finalRes);
        }
      }

    };

  
  filterTimeout = setTimeout(() => {
    bookSearchResult();
  }, 300);
  }
  return(<div className="search-books">
  <div className="search-books-bar">
    <Link to="/" className="close-search">
      Close
    </Link>
    <div className="search-books-input-wrapper">
      <input
        type="text"
        placeholder="Search by title, author, or ISBN"
        value={query}
        onChange={(event) => updateQuery(event.target.value)}
      />
    </div>
  </div>
  <div className="search-books-results">
    <ol className="books-grid">
        {resBooks.map((book, index) => (
        <Book key={index} book={book} onUpdateBook={onUpdateBook} />
        ))}
    </ol>
  </div>
</div>
)};

export default BookSearch;