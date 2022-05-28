const Users = require('../controllers/user');
const Books = require('../controllers/book');


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: ' Welcome to my Store API!!!'
  }));

  app.post('/api/users', Users.signUp);

  app.post('/api/users/:userId/books', Books.create);
  app.get('/api/books', Books.list);
  app.put('/api/books/:bookId', Books.modify);
  app.delete('/api/books/:bookId', Books.delete);
};