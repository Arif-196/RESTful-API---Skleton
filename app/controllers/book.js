const model = require('../models');

const { Book } = model;

class Books {
  static create(req, res) {
    const { title, author, description, quantity } = req.body;
    const { userId } = req.params;
    return Book.create({
      title,
      author,
      description,
      quantity,
      userId
    })
    .then(book => res.status(201).send({
      message: `Your book With title ${title} has been created succesfully `, book
    }))
  };

  static list(req, res) {
    return Book.findAll()
    .then(books => res.status(200).send(books))
  };

  static modify(req, res) {
    const { title, author, description, quantity } = req.body;
    return Book
    .findById(req.params.id)
    .then((book) => {
      book.update({
        title: title || book.title,
        author: author || book.author,
        description: description || book.description,
        quantity: quantity || book.quantity
      })
      .then((updatedBook) => {
        res.status(200).send({
          message: 'Book updated succesfully',
          data: {
            title: title || updatedBook.title,
            author: author || updatedBook.author,
            description: description || updatedBook.description,
            quantity: quantity || updatedBook.quantity
          }
        })
      })
        .catch(err => res.status(400).send(err));
    })
    .catch(err => res.status(400).send(err));
  };

  static delete(req, res) {
    return Book.findById(req.params.id)
    .then(book => {
      if(!book) {
        return res.status(400).send({
          message: 'Book Not Found',
        });
      }
      return book.destroy()
      .then(() => res.status(200).send({
        message: 'Book succesfully deleted'
      }))
      .catch(err => res.status(400).send(err));
    })
    .catch(err => res.status(400).send(err))
  };
}

module.exports = Books;