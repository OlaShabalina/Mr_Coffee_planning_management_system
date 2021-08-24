const express = require('express');
const app = express();
const PORT = 3000;
const data = require('./data.js'); // Access to our in-file database
const bcrypt = require('bcrypt'); // Password encryption

// formating for the data
app.use(express.urlencoded( { extended: true }));
app.use(express.json());


// taking data out of the file data.js
const users = data.users;
const schedules = data.schedules;

// Route to home page
app.get('/', (req, res) => {
    res.send('Welcome to our schedule website')
})

// Route to users
app.get('/users', (req, res) => {
    res.send(data.users);
})

// Add a new user

app.post('/users', (req, res) => {
    let { firstname, lastname, email, password } = req.body;
    // Password encryption
    bcrypt.hash(password, 10, (err, hash) => {
        password = hash;
        users.push({firstname, lastname, email, password});
    });
    res.redirect('/users');
});

// Add a new user schedule

app.post('/schedules', (req, res) => {
    const { user_id, day, start_at, end_at } = req.body;
    if (user_id < users.length) {
        schedules.push({ user_id, day, start_at, end_at });
        res.redirect('/schedules');
    } else {
        res.send(`User ${user_id} doesn't exists`);
    }
});

// Route for an individual user
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    for (let i = 0; i < users.length; i++ ) {
        if (i == id) {
            res.send(users[i]);
        };
    }
})

// Route for an individual user schedule

app.get('/users/:id/schedules', (req, res) => {
    const { id } = req.params;
    const schedulesShown = [];
    for ( let schedule of schedules) {
        if (schedule.user_id == id) {
            schedulesShown.push(schedule);
        }
    }
    res.send(schedulesShown);
});

// Route to schedules
app.get('/schedules', (req, res) => {
    res.send(data.schedules)
})

app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`)
})

