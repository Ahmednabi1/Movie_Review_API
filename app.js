require('dotenv').config()
const express = require('express');
const db = require('./db');
const sequelize = require('./db').sequelize;
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcrypt');
const signup = require('./routes/signup')
const login = require('./routes/login')
const profile = require('./routes/profile')
const director = require('./routes/director')
const genre = require('./routes/genre')
const movies = require('./routes/movie')
const review = require('./routes/review')

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: 'your-secret-key',
        cookie: {
            secure: false,
        }
    })
)
app.use('/login', login)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



app.use('/signup', signup)
app.use('/profile', profile)
app.use('/director', director)
app.use('/genre', genre)
app.use('/movies', movies)
app.use('/review', review)