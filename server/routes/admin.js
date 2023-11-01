const mongoose = require("mongoose");
const express = require('express');
const mongodb = require('mongodb');
const { Book, Admin } = require("../db");
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      res.status(403).json({msg: "Admin doesnt exist"})
      return
    }
    res.json({
        username: admin.username
    })
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    function callback(admin) {
      if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
      } else {
        const obj = { username: username, password: password };
        const newAdmin = new Admin(obj);
        newAdmin.save();

        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
      }
  
    }
    Admin.findOne({ username }).then(callback);
  });
  
  router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
  
  router.post('/books', authenticateJwt, async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.json({ message: 'Book created successfully', bookId: book.id });
  });
  
  router.put('/books/:bookId', authenticateJwt, async (req, res) => {
    try{
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    if (book) {
      res.json({ message: 'Book updated successfully' });
    } else {
      res.status(404).json({ message: 'book not found' });
    }
  }catch(err){
    res.status(403).json({ message: 'error' });
  }
  });
  
  router.get('/books', authenticateJwt, async (req, res) => {
    const books = await Book.find({});
    res.json({ books });
  });
  
  router.get('/books/:bookId', authenticateJwt, async (req, res) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    res.json({ book });
  });
  router.delete('/books/:id',authenticateJwt,async (req, res) => {
    
        const bookId = req.params.id;
        
        try{
            
            const result = await Book.deleteOne({_id:bookId});
                
                if((result.deletedCount)===1){
                res.status(200).json({ message: `Book with ${bookId} deleted successfully`});

                }else{
                    res.status(404).json({ message: `Book with ${bookId} not exist`});
                }
               
                
        }catch(err){
            res.status(401).json({ message: 'error occured'});

        }
    
       

  });

  module.exports = router