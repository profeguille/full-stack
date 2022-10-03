const express = require('express');
const app = express();
require('dotenv').config();

const { connectMongoose } = require('./config/mongooseConnection');
const { configPassport } = require('./config/passport');
const { setAppSessionRedis } = require('./config/appSession');
const { setAppEngine } = require('./config/appEngine');
const { setAppMiddleWares } = require('./config/appMiddelWares');
const { initializeApp } = require('./config/initializeApp');

connectMongoose();
setAppSessionRedis(app);
configPassport();
setAppEngine(app);
setAppMiddleWares(app);
initializeApp(app);

app.use('/api/auth', require('./routes/auth.routes'));

app.get('/', (req, res) => {
  res.render('index', {});
});

app.get('*', (req, res) => {
  res.status(404).render('routing-error', {});
});
