const mongoose = require("mongoose");
// Define mongoose schemas

  
const adminSchema = new mongoose.Schema({
    username: String,
    password: String
  });
  
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    summary: String,
    imageLink: String,
    published: Boolean
  });

const Admin = mongoose.model('Admin', adminSchema);
const Book = mongoose.model('Book', bookSchema);
  
  module.exports = {
    Book,
    Admin

  }