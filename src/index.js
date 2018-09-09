import  http from 'http';
import  express from 'express';
import  bodyParser from 'body-parser';
import  mongoose  from 'mongoose';
import passport  from "passport";

const LocalStrategy  = require('passport-local').Strategy;


//
import  config from  './config';
import  routes from  './routes';

let app = express();
app.server = http.createServer(app);



// middleware


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({
     limit: config.bodyLimit
}));



// passprt eslintConfig
  app.use(passport.initialize());

  let Account = require('./model/account');

  passport.use(new LocalStrategy({
       usernameField: 'email',
       passwordField:  'password'
     }, Account.authenticate()
  ));

  passport.serializeUser(Account.serializeUser());
  passport.deserializeUser(Account.deserializeUser());

// api routes v1
app.use('/v1.1', routes);
app.server.listen(config.port);
console.log(`started port ${app.server.address().port}`);

export  default app;
