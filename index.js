const express = require('express');
const app = express();
const PORT = 3000;
const data = require('./data.js');


app.use(express.urlencoded( { extended: true }));
app.use(express.json());

// Route to home page
app.get('/', (req, res) => {
    res.send('Welcome to our schedule website')
})

// Route to users
app.get('/users', (req, res) => {
    res.send(data.users);
})

// Route for an individual user
app.get('/users/:id', (req, res) => {
    const users = data.users;
    const { id } = req.params;
    for (let i = 0; i < users.length; i++ ) {
        if (i == id) {
            res.send(users[i]);
        } else {
            res.send(`Apologies. Id "${id}" doesn't exists in our system. Please enter a valid id`)
        }
    }
})

// Route for an individual user schedule

app.get('/users/:id/schedules', (req, res) => {
    let schedules = data.schedules;
    const { id } = req.params;
    schedules = schedules.filter(schedule => schedule.user_id == id);
    if (schedules.user_id) {
        res.send(schedules);
    } else {
        res.send(`User ${id} either doesn't exists or doesn't have a schedule yet`);
    }
})

// Route to schedules
app.get('/schedules', (req, res) => {
    res.send(data.schedules)
})

// Add a new user

app.post('/users', (req, res) => {
    const users = data.users;
    const post = req.body;
    users.push(post);
    res.redirect('/users')
});

// Add a new user schedule

app.post('/schedules', (req, res) => {
    const schedules = data.schedules;
    const post = req.body;
    schedules.push(post);
    res.redirect('/schedules')
});


app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`)
})

