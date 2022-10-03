function setAppEngine(app) {
  const { engine } = require('express-handlebars');
  app.set('view engine', 'hbs');
  app.set('views', './views');
  app.engine(
    'hbs',
    engine({
      extname: '.hbs',
      defaultLayout: 'index.hbs',
      layoutsDir: './views/layouts',
      partialsDir: './views/partials',
    })
  );
}

module.exports = { setAppEngine };
