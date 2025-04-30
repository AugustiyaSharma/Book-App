import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Viewbook = () => {
  const [books, setBooks] = useState([])
  const navigate = useNavigate()

  const fetchBooks = () => {
    axios.get('https://book-app-2-17xw.onrender.com/books')
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleDelete = async (id) => {
    await axios.delete(`https://book-app-2-17xw.onrender.com/books/${id}`)
    fetchBooks()
  }

  const handleUpdate = (id) => {
    navigate(`/update?id=${id}`)
  }

  return (
    <div className="books-container">
      {books.length === 0 ? (
        <p style={{ color: '#ccc' }}>No books available</p>
      ) : (
        books.map((book) => (
          <div key={book._id} className="book-card">
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Date:</strong> {book.date || 'N/A'}</p>
            <div className="card-actions">
              <button className="btn update" onClick={() => handleUpdate(book._id)}>Update</button>
              <button className="btn delete" onClick={() => handleDelete(book._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Viewbook
