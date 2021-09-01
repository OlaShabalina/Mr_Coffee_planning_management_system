const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const data = require('./data.js'); // Access to our in-file database
const bcrypt = require('bcrypt'); // Password encryption
const path = require('path');

// Body Parser
app.use(express.json());
app.use(express.urlencoded( { extended: true }));

// Setting up our static folder
app.use(express.static(path.join(__dirname,'public')));

// Set view engine as EJS 
app.set('view engine', 'ejs');

// taking data out of the file data.js
const users = data.users;
const schedules = data.schedules;
users.sort();

// Route to home page
app.get('/', (req, res) => {
    res.render('pages/home');
})

// Route to users
app.get('/users', (req, res) => {
    res.render('pages/users', { users });
})

// Add a new user

app.get('/users/new', (req, res) => {
    res.render('pages/user-new');
})

app.post('/users', (req, res) => {
    let { firstname, lastname, email, password } = req.body;
    // Password encryption
    bcrypt.hash(password, 10, (err, hash) => {
        password = hash;
        users.push({firstname, lastname, email, password});
        res.redirect('/users');
    });
});

// Add a new user schedule

app.get('/schedules/new', (req, res) => {
    res.render('pages/schedule-new', { users });
})

app.post('/schedules', (req, res) => {
    const { user, dayOfWeek, start_at, end_at } = req.body;

    const user_id = users.findIndex((item, index) => {
        const userArray = user.split(' ');
        return userArray[0] === item.firstname && userArray[1] === item.lastname;
    });

    const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const day = week.findIndex((item) => {
        return dayOfWeek == item;    
    }) + 1;

    schedules.push({ user_id, day, start_at, end_at });
    res.redirect('/schedules')
});

// Route for an individual user
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const errorMessage = `There is no user with id ${id} in our system`;
    const userFound = users.find((user, index) => {
        if (index == id) {
            return user;
        };
    });
    if (userFound) {
        res.render('pages/user-info', { userFound, id });
    } else {
        res.render('pages/error', { errorMessage });
    }
})

// Route for an individual user schedule

app.get('/users/:id/schedules', (req, res) => {
    const { id } = req.params;
    const errorMessage = `User ${id} doesn't have a schedule yet`
    const filteredSchedules = schedules.filter((schedule) => {
        return schedule.user_id == id;
    });
    if (filteredSchedules.length > 0) {
        res.render('pages/user-schedule', { filteredSchedules, id });
    } else {
        res.render('pages/error', { errorMessage });
    }
});

// Route to schedules
app.get('/schedules', (req, res) => {
    res.render('pages/schedules', { schedules })
})

app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`)
})