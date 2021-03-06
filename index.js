require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

const mongoose = require('mongoose');
const config = require('./config/config')[env];
const express = require('express');
const indexRouter = require('./routes/index');
const cubeRouter = require('./routes/cube');
const accessoryRouter = require('./routes/accessory');
const authRouter = require('./routes/auth');
const { checkLoggedIn } = require('./controllers/user');
const app = express();

mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        throw err;
    }
    console.log('Database is setup.');
});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

require('./config/express')(app);

app.use('/', indexRouter);
app.use('/', cubeRouter);
app.use('/', accessoryRouter);
app.use('/', authRouter);

app.get('*', checkLoggedIn, (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        isLoggedIn: req.isLoggedIn
    });
})


app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));