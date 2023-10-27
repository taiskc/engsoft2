const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the expense name"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: [true, "Please add the expense category"]
    },
    value: {
        type: Number,
        required: [true, "Please add the expense value"]
    },
    date: {
        type: Date,
        required: [true, "Please add the expense date"]
    },
}, {
    timestamps: false,
});

module.exports = mongoose.model("expense", expenseSchema);