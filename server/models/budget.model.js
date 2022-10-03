const mongoose = require('mongoose');
const BudgetSchema = new mongoose.Schema({
  authorId: { type: String, required: true },
  descripton: { type: String, required: true, max: 250 },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true, max: 7 },
  category: { type: String, required: true, max: 50 },
});

const Budgets = mongoose.model('budgets', BudgetSchema);
module.exports = Budgets;
