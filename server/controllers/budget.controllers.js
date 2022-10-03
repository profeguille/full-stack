function getAll(req, res) {
  return res.send('hola getAll');
}

function postNew(req, res) {
  return res.send('hola postNew');
}

function updateOne(req, res) {
  return res.send('hola updateOne');
}

function deleteOne(req, res) {
  return res.send('hola deleteOne');
}

module.exports = { getAll, postNew, updateOne, deleteOne };
