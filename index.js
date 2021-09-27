const express = require('express');
const app = express();
const PORT = process.env.PORT || 3100
const path = require('path');

// Routes 
const homeRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const schedulesRouter = require('./routes/schedules');

// Body Parser
app.use(express.json());
app.use(express.urlencoded( { extended: true }));

// Setting up our static folder
app.use(express.static(path.join(__dirname,'public')));

// Set view engine as EJS 
app.set('view engine', 'ejs');

// ROUTE MIDDLEWARE
app.use('/', homeRouter);

app.use('/users', usersRouter);

app.use('/schedules', schedulesRouter);


app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`)
});