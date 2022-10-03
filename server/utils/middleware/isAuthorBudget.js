function checkIsAuthorBudget(req, res, next) {
  const ObjectId = require('mongodb').ObjectId;
  const Budgets = require('../../models/budget.model');

  let { id } = req.params;
  let mongoId;
  try {
    mongoId = new ObjectId(id);
    if (!id || !mongoId || typeof id != 'string') return res.status(200).send({ error: 'Send a valid income/expense id.' });
  } catch (e) {
    return res.status(500).send({ error: 'Wrong income/expense id.' });
  }

  Budgets.findOne({ $and: [{ _id: mongoId }, { authorId: req.user._id.toString() }] }).then((doc) => {
    if (doc) return next();
    return res.status(401).send({ error: 'Unauthorized to read/update/delete this income/expense.' });
  });
}
module.exports = { checkIsAuthorBudget };
