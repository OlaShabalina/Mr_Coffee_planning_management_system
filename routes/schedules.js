const express = require('express');
const router = express.Router();
const db = require('../database');

// Add a new user schedule

router.get('/new', (req, res) => {
    db.any('SELECT * FROM users;')
    .then(users => {
        res.render('pages/schedule-new', { users })
    })
    .catch(error => {
        res.send(error)
    });
})

router.post('/', (req, res) => {
    let { user_id, day, start_at, end_at } = req.body;
    
    db.none('INSERT INTO schedules(user_id, day, start_at, end_at) VALUES($1, $2, $3, $4);', [user_id, day, start_at, end_at])
    .then(() => {
        res.redirect('/schedules');
    })
    .catch(error => {
        res.send(error);
    })
});

// Route to schedules
router.get('/', (req, res) => {
    db.any('SELECT firstname,lastname,day,start_at,end_at,schedule_id,schedules.user_id FROM schedules INNER JOIN users ON schedules.user_id = users.user_id;')
    .then((schedules) => {
        schedules.forEach((schedule) => {
            
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
        });
        res.render('pages/schedules', { schedules })
    })
    .catch(error => {
        res.send(error)
    });
});

module.exports = router;