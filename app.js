const express = require('express');
const app = express();
const port = 3000;

const logger = require('./middleware/logger');
const booksRouter = require('./routes/books');
app.use(express.json());
app.use(logger);
app.use('/books', booksRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});