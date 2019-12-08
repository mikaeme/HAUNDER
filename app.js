'use strict';
const express = require('express');
const passport = require('./utils/pass');
const app = express();
const port = 3000;
const cors = require('cors');
const dogRoute = require('./routers/dogRoute');
const authRoute = require('./routers/authRoute');
const formRoute = require('./routers/formRoute');

app.use(express.static('uploads'));
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use('/dog', dogRoute);
app.use('/auth', authRoute);
app.use('/form', formRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));