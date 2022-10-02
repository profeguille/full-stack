const express = require('express');
const passport = require('passport');
const app = express();
require('dotenv').config();

const { connectMongoose } = require('./config/mongooseConnection.js');
const { configPassport } = require('./config/passport.js');
const { setAppSessionRedis } = require('./config/appSession.js');
const { setAppEngine } = require('./config/appEngine.js');
const { setAppMiddleWares } = require('./config/appMiddelWares.js');
const authControllers = require('./controllers/auth.controllers.js');

connectMongoose();
setAppSessionRedis(app);
configPassport(passport);
setAppEngine(app);
setAppMiddleWares(app, express, passport);

const EXPRESS_PORT = process.env.EXPRESS_PORT || 8000;
app
  .listen(EXPRESS_PORT, () => {
    console.log(`Example app listening on port http://localhost:${EXPRESS_PORT}`);
  })
  .on('error', (e) => {});

app.get('/', authControllers.getRoot);
app.get('/login', authControllers.getLogin);
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), authControllers.postLogin);
app.get('/faillogin', authControllers.getFaillogin);
app.get('/signup', authControllers.getSignup);
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), authControllers.postSignup);
app.get('/failsignup', authControllers.getFailsignup);
app.get('/logout', authControllers.getLogout);

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

app.get('/ruta-protegida', checkAuthentication, (req, res) => {
  const { username, password } = req.user;
  const user = { username, password };
  res.send('<h1>Ruta ok!</h1>' + JSON.stringify(user));
});

app.get('*', authControllers.failRoute);
