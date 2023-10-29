const express = require("express");
const router = express.Router();
const {getExpenses, getExpense, updateExpense, deleteExpense, createExpense, getMeanValuePerCategory, getTotalValuePerCategory, getMonthVariationPerCategory} = require("../controllers/expenseController");

router.route("/").get(getExpenses).post(createExpense);

router.route("/meanValuePerCategory").get(getMeanValuePerCategory);

router.route("/totalValuePerCategory").get(getTotalValuePerCategory);

router.route("/monthVariationPerCategory").get(getMonthVariationPerCategory);

router.route("/:id").get(getExpense).put(updateExpense).delete(deleteExpense);

module.exports = router;