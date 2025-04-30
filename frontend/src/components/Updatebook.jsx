import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

const UpdateBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    image: '',
    date: ''
  })
  const [error, setError] = useState('')
  
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const bookId = queryParams.get('id')

  useEffect(() => {
    if (!bookId) {
      setError('No book ID provided!')
      return
    }

    axios.get(`https://book-app-2-17xw.onrender.com/books/${bookId}`)
      .then(res => {
        setBook(res.data)
      })
      .catch(err => {
        setError('Error fetching book data!')
        console.error(err)
      })
  }, [bookId])

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!book.title || !book.author) {
      setError('Title and Author are required!')
      return
    }

    try {
      await axios.put(`https://book-app-2-17xw.onrender.com/books/${bookId}`, book)
      alert('Book updated successfully!')
      navigate('/view')
    } catch (err) {
      setError('Error updating book!')
      console.error(err)
    }
  }

  return (
    <div className="form-container">
      <h2>Update Book</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <input
          type="text"
          name="image"
          value={book.image}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <input
          type="date"
          name="date"
          value={book.date}
          onChange={handleChange}
        />
        <button type="submit" className="btn update">Update Book</button>
      </form>
    </div>
  )
}

export default UpdateBook
