const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./database/db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);


const PORT = process.env.PORT || 3000
app.listen( PORT, async () => {
   await connectDB();
    console.log(`App listening on port ${PORT}`)
})
module.exports = app; // Export the app object
