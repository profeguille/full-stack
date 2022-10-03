function initializeApp(app) {
  const EXPRESS_PORT = process.env.EXPRESS_PORT || 8000;
  app
    .listen(EXPRESS_PORT, () => {
      console.log(`Example app listening on port http://localhost:${EXPRESS_PORT}`);
    })
    .on('error', (e) => {});
}
module.exports = { initializeApp };
