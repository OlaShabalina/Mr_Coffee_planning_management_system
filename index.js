const express = require('express');
const app = express();
const PORT = 3000;
const data = require('./data.js');

// Route to home page
app.get('/', (req, res) => {
    res.send('Welcome to our schedule website')
})

// Route to users
app.get('/users', (req, res) => {
    res.send(data.users)
})

// Route to schedules
app.get('/schedules', (req, res) => {
    res.send(data.schedules)
})


app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`)
})

