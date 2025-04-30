import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Addbook from './components/Addbook'
import Viewbook from './components/Viewbook'
import Updatebook from './components/Updatebook'
import Deletebook from './components/Deletebook'
import Searchbook from './components/Searchbook'
import './App.css'

const App = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : ''
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode]) 

  return (
    <div className={`app-wrapper ${darkMode ? 'dark' : ''}`}>
      <Router>
        <div className="app-container">
          <nav>
            <ul>
              <li><Link to='/add'>Add Book</Link></li>
              <li><Link to='/view'>View Book</Link></li>
              <li><Link to='/update'>Update Book</Link></li>
              <li><Link to='/delete'>Delete Book</Link></li>
              <li><Link to='/search'>Search Book</Link></li>
            </ul>
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path='/add' element={<Addbook />} />
              <Route path='/view' element={<Viewbook />} />
              <Route path='/update' element={<Updatebook />} />
              <Route path='/delete' element={<Deletebook />} />
              <Route path='/search' element={<Searchbook />} />
            </Routes>
          </main>

          <footer className="footer">
            &copy; {new Date().getFullYear()} Augustiya Sharma. All rights reserved.
          </footer>
        </div>
      </Router>
    </div>
  )
}

export default App
