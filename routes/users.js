const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcrypt'); // Password encryption

// Route to users
router.get('/', (req, res) => {
    db.any('SELECT * FROM users;')
    .then(users => {
        res.render('pages/users', { users })
    })
    .catch(error => {
        res.send(error)
    });
})

// Add a new user

router.get('/new', (req, res) => {
    res.render('pages/user-new');
})

router.post('/', (req, res) => {
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

// Route for an individual user
router.get('/:id', (req, res) => {
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

router.get('/:id/schedules', (req, res) => {
    const { id } = req.params;
    const errorMessage = `User ${id} doesn't have a schedule yet`
    db.any('SELECT day,start_at,end_at,user_id FROM schedules;')
    .then(schedules => {
        const filteredSchedules = schedules.filter((schedule) => {
            if (schedule.user_id == id) {
                // showing days of the week instea of index 
            const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            for (let i = 1; i <= 7; i++) {
                if (i == schedule.day) {
                    schedule.day = week[i - 1];
                };
            };            

            // formating time not to show seconds
            schedule.start_at = schedule.start_at.split(':').slice(0,2).join(':');
            schedule.end_at = schedule.end_at.split(':').slice(0,2).join(':');

            return schedule;
            };
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

module.exports = router;