import React from 'react'
import axios from 'axios'
const Addbook = () => {
    const handlebooks=async(e)=>{
        e.preventDefault();
        const title=e.target.title.value;
        const author=e.target.author.value;
        const data=e.target.data.value;
        const image=e.target.image.value;
        const books={title,author,data,image};
        await axios.post('http://localhost:9000/books',books)
        alert('Book Added Successfully')
    }
  return (
    <div>
        <h1>Add book Details</h1>
        <form onSubmit={handlebooks}>
            Title:<input type="text" name="title"  required/>
            Author:<input type="text" name="author" required/>
            Date:<input type="date" name="data" required/>
            Image:<input type="text" name="image" required/>
            <button type="submit">Add Book</button>

        </form>
    </div>
  )
}

export default Addbook