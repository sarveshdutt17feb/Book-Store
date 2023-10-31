const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
 const adminRouter = require("./routes/admin");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter)
app.get("/", (req, res) => res.json({msg: "hello world after the class"}));

// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose.connect('mongodb+srv://sarveshdutt40:PSjYaf6EUOvT2olT@cluster0.u0eiysp.mongodb.net/books', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "books" });
app.listen(3000, () => console.log('Server running on port 3000'));