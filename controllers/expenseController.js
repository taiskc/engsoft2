const asyncHandler = require("express-async-handler");

const Expense = require("../models/expenseModel");
const Category = require("../models/categoryModel");

const getDateRange = (req) => {
    const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date('0000-01-01');
    const endDate = req.query.endDate ? new Date(req.query.endDate): new Date();
    
    return { startDate, endDate };
}

const getExpenses = asyncHandler (async (req, res) => {
    const { startDate, endDate } = getDateRange(req);
    const expensesByDateRange = await Expense.find({
        date: {
            $gte: startDate, 
            $lte: endDate
        }
    });
    res.status(200).json(expensesByDateRange);
});

const getExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
        res.status(404);
        throw new Error("Expense not found")
    }
    res.status(200).json(expense);
});

const getExpansesByCategoryAndDate = asyncHandler(async (categoryId, dateRange) => {
    const expensesByCategoryAndDate = await Expense.find({
        category: categoryId,
        date: {
            $gte: dateRange.startDate, 
            $lte: dateRange.endDate
        }
    });

    return expensesByCategoryAndDate;
});

const calculateExpensesValuesSum = (expenses) => {
    return expenses.reduce((currentSum, expense) => {
      return currentSum + expense.value;
    }, 0);
  }

const getMeanValuePerCategory = asyncHandler(async (req, res) => {
    const dateRange = getDateRange(req);
    const categories = await Category.find();
    const meanValuePerCategory = [];
    await Promise.all(categories.map(async category => {
        const expensesByDateRange = await getExpansesByCategoryAndDate(category.id, dateRange);
        const totalValue = calculateExpensesValuesSum(expensesByDateRange);
        const meanValue = expensesByDateRange.length > 0 ? totalValue / expensesByDateRange.length : 0;
        meanValuePerCategory.push({category: category.name, meanValue: meanValue})
    }));
    res.status(200).json(meanValuePerCategory);
});

const getTotalValuePerCategory = asyncHandler(async (req, res) => {
    const dateRange = getDateRange(req);
    const categories = await Category.find();
    const totalValuePerCategory = [];
    await Promise.all(categories.map(async category => {
        const expensesByDateRange = await getExpansesByCategoryAndDate(category.id, dateRange);
        const totalValue = calculateExpensesValuesSum(expensesByDateRange);
        totalValuePerCategory.push({category: category.name, totalValue: totalValue})
    }));
    res.status(200).json(totalValuePerCategory);
});

const monthVariationPerCategory = asyncHandler(async (req, res) => {
    const currentMonthStartDate = new Date().setDate(new Date().getDate() - 30);
    const currentMonthEndDate = new Date();
    const lastMonthStartDate = new Date().setDate(new Date().getDate() - 61);
    const lastMonthEndDate = new Date().setDate(new Date().getDate() - 31);
    const currentMonthDateRange = { startDate: currentMonthStartDate, endDate: currentMonthEndDate }
    const lastMonthDateRange = { startDate: lastMonthStartDate, endDate: lastMonthEndDate }
    const categories = await Category.find();
    let monthVariationPerCategory = [];
    await Promise.all(categories.map(async category => {
        let currentMonthTotalValue = 0;
        let lastMonthTotalValue = 0;
        const currentMonthExpenses = await getExpansesByCategoryAndDate(category.id, currentMonthDateRange);
        const lastMonthExpenses = await getExpansesByCategoryAndDate(category.id, lastMonthDateRange);
        currentMonthExpenses.forEach(expense => {
            currentMonthTotalValue += expense.value;
        });
        lastMonthExpenses.forEach(expense => {
            lastMonthTotalValue += expense.value;
        });
        monthVariationPerCategory.push({category: category.name, monthVariation: currentMonthTotalValue - lastMonthTotalValue});
    }));
    res.status(200).json(monthVariationPerCategory);
});

const createExpense = asyncHandler (async (req, res) => {
    const { name, category, value, date } = req.body;
    if (!name | !category | !value | !date) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const expense = await Expense.create({ name, category, value, date })
    res.status(201).json(expense);
});

const updateExpense = asyncHandler(async(req, res) => {
    res.status(201).json({ message: `Update expense for ${req.params.id}`});
});

const deleteExpense = asyncHandler(async (req, res) => {
    res.status(201).json({ message: `Delete expense for ${req.params.id}`});
});

module.exports = { getExpenses, createExpense, getExpense, updateExpense, deleteExpense, getMeanValuePerCategory, getTotalValuePerCategory, monthVariationPerCategory };