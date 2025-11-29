const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../books.json');

function readBooks() {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function writeBooks(books) {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2), 'utf8');
}

let books = readBooks();
let nextId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;

router.get('/', (req, res) => {
  books = readBooks();
  res.json(books);
});

router.post('/', (req, res) => {
  const { title, author, price } = req.body;
  books = readBooks();
  
  const newBook = {
    id: nextId++,
    title,
    author,
    price
  };
  
  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, price } = req.body;  
  books = readBooks();  
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
  
  writeBooks(books);
  res.json(books[bookIndex]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);  
  books = readBooks();  
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  
  books.splice(bookIndex, 1);
  writeBooks(books);
  res.json({ message: 'Book deleted successfully' });
});

module.exports = router;