'use strict';
const express = require('express');
const passport = require('./utils/pass');
const app = express();
const port = 3000;
const cors = require('cors');
const dogRoute = require('./routers/dogRoute');
const authRoute = require('./routers/authRoute');
const formRoute = require('./routers/formRoute');
const userRoute = require('./routers/userRoute');
const postRoute = require('./routers/postRoute');

app.use(express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use('/dog', passport.authenticate('jwt', {session: false}), dogRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

app.use('/dog', dogRoute);
app.use('/auth', authRoute);
app.use('/form', formRoute);
app.use('/posting', postRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));