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


app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`)
})

