// Import necessary modules
const express = require('express');    // Express for building the server
const mongoose = require('mongoose');  // Mongoose for interacting with MongoDB
const axios = require('axios');        // Axios for making HTTP requests
const cors = require('cors');          // CORS for handling cross-origin requests

// Create an instance of Express
const app = express();

// Use middleware
app.use(express.json());               // Allows server to parse JSON in requests
app.use(cors());                       // Enables CORS for all routes

// Connect to MongoDB using Mongoose
// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/transactionsDB')
    .then(() => console.log('MongoDB connected'))  // If connection is successful
    .catch(err => console.log(err));   // If there is an error

// Start the Express server on port 5000
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});

// Define the schema for a transaction
const transactionSchema = new mongoose.Schema({
    id: String,                      // Unique identifier for the transaction
    title: String,                   // Title of the transaction (e.g., product name)
    description: String,             // A description of the transaction
    price: Number,                   // The price at which the product was sold
    dateOfSale: Date,                // The date when the sale occurred
    category: String,                // Category of the product (e.g., Electronics, Books)
    sold: Boolean                    // Whether the product is sold or not
});

// Create the model from the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

// Define the /api/init endpoint
app.get('/api/init', async (req, res) => {
    try {
        // Fetch the data from the third-party API
        const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        // Insert data into the MongoDB database
        await Transaction.insertMany(data);
        // Send success response
        res.status(200).send('Database initialized with seed data.');
    } catch (err) {
        // Handle any errors
        res.status(500).json({ message: 'Error initializing database', err });
    }
});

// Start the server on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 