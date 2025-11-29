const express = require('express');
const router = express.Router();
const booksData = require('../books.json');

let books = [...booksData];
let nextId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;

router.get('/', (req, res) => {
  res.json(books);
});

router.post('/', (req, res) => {
  const { title, author, price } = req.body;
  
  const newBook = {
    id: nextId++,
    title,
    author,
    price
  };
  
  books.push(newBook);
  res.status(201).json(newBook);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, price } = req.body;
  
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  
  books[bookIndex] = {
    id,
    title,
    author,
    price
  };
  
  res.json(books[bookIndex]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  
  books.splice(bookIndex, 1);
  res.json({ message: 'Book deleted successfully' });
});

module.exports = router;