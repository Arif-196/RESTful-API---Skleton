const model = require('../models');

const { User } = model;
class Users {
  static signUp(req, res) {
    const { name, username, email, password } = req.body;
    return User.create({
      name,
      username,
      email,
      password
    })
    .then(userData => res.status(201).send({
      succes: true,
      message: "User succesfully created",
      userData
    }))
  }
}

module.exports = Users;