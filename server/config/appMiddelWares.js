function setAppMiddleWares(app) {
  const express = require('express');
  const passport = require('passport');

  app.use('/public', express.static(__dirname + '/public'));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}

module.exports = { setAppMiddleWares };
