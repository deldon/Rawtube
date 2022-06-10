const express = require('express');
const router = require('./routers/router');
const session = require('express-session')
 
const app = express();

const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./public'));

// app.use(session({
//     secret: process.env.SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {}
// }));

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

module.exports = app;
