const express = require('express');
const app = express();

require('dotenv').config();
require('./config/mongooseConnection').connectMongoose();
require('./config/appSession').setAppSessionRedis(app);
require('./config/passport').configPassport();
require('./config/appEngine').setAppEngine(app);
require('./config/appMiddelWares').setAppMiddleWares(app);
require('./config/initializeApp').initializeApp(app);

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/budget', require('./routes/budget.routes'));

app.get('/', (req, res) => {
  res.render('index', {});
});

app.get('*', (req, res) => {
  res.status(404).render('routing-error', {});
});
