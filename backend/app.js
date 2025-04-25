const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
dotenv.config();

// MongoDB Connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Book Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    date: String,
    image: String
});

const Book = mongoose.model("Book", bookSchema);

// GET all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send("Server error");
    }
});

// GET single book by ID
app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// POST add new book
app.post('/books', async (req, res) => {
    try {
        const newbook = new Book(req.body);
        await newbook.save();
        res.status(200).send("Book Added");
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

// PUT update book by ID
app.put('/books/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).send("Book not found");
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// DELETE book by ID
app.delete('/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).send("Book not found");
        }
        res.status(200).send("Book Deleted");
    } catch (error) {
        res.status(500).send("Server error");
    }
});

// Start the server
app.listen(9000, () => {
    console.log("Server is running on port 9000");
});
