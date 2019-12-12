'use strict';
const express = require('express');
const passport = require('./utils/pass');
const fs = require('fs');
const https = require('https');
const app = express();
const port = 8000;
const httpsPort = 3000;
const cors = require('cors');

const sslkey = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
const options = {
  key: sslkey,
  cert: sslcert,
};
const dogRoute = require('./routers/dogRoute');
const authRoute = require('./routers/authRoute');
const formRoute = require('./routers/formRoute');
const userRoute = require('./routers/userRoute');
const postRoute = require('./routers/postRoute');
const commentRoute = require('./routers/commentRoute');

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
app.use('/commenting', commentRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
https.createServer(options, app).listen(httpsPort); //https traffic