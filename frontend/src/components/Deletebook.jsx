import React, { useEffect, useState } from 'react';
import axios from 'axios';


const DeleteBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:9000/books');
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching books');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:9000/books/${id}`);
      alert('Book deleted successfully');
      fetchBooks();
    } catch (error) {
      console.error(error);
      alert('Error deleting book');
    }
  };

  return (
    <div className="delete-book-container">
      <h2>📚 Delete Books</h2>
      {books.length === 0 ? (
        <p className="no-books">No books available</p>
      ) : (
        <ul className="book-list">
          {books.map((book) => (
            <li key={book._id} className="book-item">
              <div className="book-info">
                <strong>{book.title}</strong>
                <span>by {book.author}</span>
              </div>
              <button className="btn delete" onClick={() => handleDelete(book._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteBook;
