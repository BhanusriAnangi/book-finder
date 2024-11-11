import React, { useState } from 'react';
import './App.css';  // Make sure to keep this import for styling

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
    const data = await response.json();
    setBooks(data.docs);
  };

  return (
    <div className="app">
      <h1>Book Finder</h1>
      <input
        type="text"
        placeholder="Search for a book title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchBooks}>Search</button>
      <div className="books">
        {books.map((book, index) => (
          <div key={index} className="book">
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
            ) : (
              <div className="no-cover">No Cover Available</div>
            )}
            <h2>{book.title}</h2>
            <h3>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</h3>
            <p>Published: {book.first_publish_year || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
