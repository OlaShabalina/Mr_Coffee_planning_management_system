const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const bcrypt = require('bcrypt'); // Password encryption
const path = require('path');

// integrating database
const db = require('./database.js');

// Body Parser
app.use(express.json());
app.use(express.urlencoded( { extended: true }));

// Setting up our static folder
app.use(express.static(path.join(__dirname,'public')));

// Set view engine as EJS 
app.set('view engine', 'ejs');

// Route to home page
app.get('/', (req, res) => {
    res.render('pages/home');
})

// Route to users
app.get('/users', (req, res) => {
    db.any('SELECT * FROM users;')
    .then(users => {
        res.render('pages/users', { users })
    })
    .catch(error => {
        res.send(error)
    });
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
        db.none('INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4);', [firstname, lastname, email, password])
        .then(() => {
            res.redirect('/users');
        })
        .catch(error => {
            res.send(error);
        })
    });
});

// Add a new user schedule

app.get('/schedules/new', (req, res) => {
    db.any('SELECT * FROM users;')
    .then(users => {
        res.render('pages/schedule-new', { users })
    })
    .catch(error => {
        res.send(error)
    });
})

app.post('/schedules', (req, res) => {
    const { user_id, day, start_at, end_at } = req.body;

    db.none('INSERT INTO schedules(user_id, day, start_at, end_at) VALUES($1, $2, $3, $4);', [user_id, day, start_at, end_at])
    .then(() => {
        res.redirect('/schedules');
    })
    .catch(error => {
        res.send(error);
    })
});

// Route for an individual user
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const errorMessage = `There is no user with id ${id} in our system`;
    db.any('SELECT * FROM users;')
    .then(users => {
        const userFound = users.find((user) => {
            return user.user_id == id;
        });
        if (userFound) {
            res.render('pages/user-info', { userFound, id });
        } else {
            res.render('pages/error', { errorMessage });
        }
    })
    .catch(error => {
        res.send(error)
    });
})

// Route for an individual user schedule

app.get('/users/:id/schedules', (req, res) => {
    const { id } = req.params;
    const errorMessage = `User ${id} doesn't have a schedule yet`
    db.any('SELECT * FROM schedules;')
    .then(schedules => {
        const filteredSchedules = schedules.filter((schedule) => {
            return schedule.user_id == id;
        });
        if (filteredSchedules.length > 0) {
            res.render('pages/user-schedule', { filteredSchedules, id });
        } else {
            res.render('pages/error', { errorMessage });
        }
    })
    .catch(error => {
        res.send(error)
    });
});

// Route to schedules
app.get('/schedules', (req, res) => {
    db.any('SELECT * FROM schedules;')
    .then(schedules => {
        res.render('pages/schedules', { schedules })
    })
    .catch(error => {
        res.send(error)
    });
})

app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`)
})