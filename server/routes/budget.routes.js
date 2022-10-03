const router = require('express').Router();
const budgetControllers = require('../controllers/budget.controllers');
const { checkIsLoggedIn } = require('../utils/middleware/isLoggedIn');
const { checkIsAuthorBudget } = require('../utils/middleware/isAuthorBudget');

router.use(checkIsLoggedIn);

router.get('/', budgetControllers.getAll);
router.get('/:id', checkIsAuthorBudget, budgetControllers.getAll);
router.post('/', budgetControllers.postNew);
router.put('/:id', checkIsAuthorBudget, budgetControllers.updateOne);
router.delete('/:id', checkIsAuthorBudget, budgetControllers.deleteOne);

module.exports = router;
