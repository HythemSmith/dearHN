const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://longxuyen512vt:mydatabase111@cluster0.wds2z2n.mongodb.net/dearHN')
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Something went wrong'));

// Define a schema for the Message model
const messageSchema = new mongoose.Schema({
    text: String // Assuming the message is stored as a string
});

// Define the Message model based on the schema
const Message = mongoose.model('Message', messageSchema);

const app = express();
const PORT = process.env.PORT || 3000;

let opinion = '';

app.use(bodyParser.json());

app.post('/api/opinion', (req, res) => {
    const { text } = req.body;
    opinion = text;
    res.status(200).send('Opinion received successfully!');
});

app.get('/api/opinion', (req, res) => {
    res.status(200).json({ opinion });
});

// Route to save user's message to the database
app.post('/submit-thoughts', (req, res) => {
    const text = req.body.thought; // Assuming the key is 'thought' in the request body
    console.log(text)
    // Create a new document based on the Message model
    Message.create({ text })
        .then(message => {
            console.log('Message inserted successfully:', message);
            res.status(200).send('Message inserted successfully!');
        })
        .catch(err => {
            console.error('Error inserting message:', err);
            res.status(500).send('Error inserting message');
        });
});

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
