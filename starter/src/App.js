import React,{ useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "./BooksAPI.js";
import BookShelvesDisplay from "./BookShelvesDisplay.js";
import BookSearch from "./BookSearch.js";

function App() {
  const [books, setBooks] = useState([]);

  

  useEffect(()=>{
      const getBooks = async()=> {
      const res = await BooksAPI.getAll();
      setBooks(res);
      
    };
    getBooks();}
  ,[]);
  
  
  const onUpdateShelf = (book,newShelf)=>{

    const updateBooks = async()=> {
      
      await BooksAPI.update(book, newShelf);
      const response = await BooksAPI.getAll();
      setBooks(response);
    };
    updateBooks();
  };
  return (
    <Routes>
    <Route exact path="/" element={<BookShelvesDisplay books={books}
      onUpdateShelf={onUpdateShelf}></BookShelvesDisplay>}>

    </Route>
    <Route exact path="/search" element={<BookSearch books={books} onUpdateBook={onUpdateShelf}></BookSearch>}>

    </Route>
    
    </Routes>
  );
}

export default App;