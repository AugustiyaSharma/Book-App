import React, { useState } from 'react';
import axios from 'axios';

const SearchBook = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Please enter a title to search');
      return;
    }

    try {
      const res = await axios.get(`https://book-app-2-17xw.onrender.com/search?title=${query}`);
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      alert('Error while fetching books');
    }
  };

  return (
    <div className="delete-book-container">
      <h2>Search Books</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Enter book title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            borderRadius: '12px',
            border: 'none',
            background: 'var(--input-bg)',
            color: 'inherit',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
            outline: 'none',
            flex: '1',
            maxWidth: '400px',
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            padding: '0.8rem 1.2rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: 'white',
            background: 'var(--button-bg)',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
          }}
          onMouseOver={(e) => (e.target.style.background = 'var(--button-bg-hover)')}
          onMouseOut={(e) => (e.target.style.background = 'var(--button-bg)')}
        >
          Search
        </button>
      </div>

      {books.length > 0 ? (
        <div className="books-container">
          {books.map((book) => (
            <div key={book._id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: 'var(--nav-text)', fontSize: '1.1rem' }}>
          No books found
        </p>
      )}
    </div>
  );
};

export default SearchBook;
