const TransactionModel = require('../../models/TransactionModel');
const extensionShared = require('./sharedExtension');
const moment = require('moment');

const DEFAULT_VALUE_REVENUE = { _id: null, releases: 0, revenue: 0};
const DEFAULT_VALUE_EXPENSE = { _id: null, releases: 0, expense: 0};

const getRevenues = async (date, filter) => {
    return await TransactionModel.aggregate([
        {
            $match: {
                yearMonth: date,
                description: { $regex: new RegExp(filter), $options: 'i' },
                type: "+"
            }
        },
        {
            $group: {
                _id: null,
                releases: { $sum: 1 },
                revenue: { $sum: "$value" }
            }
        }
    ]);
}

const getExpenses = async (date, filter) => {
    return await TransactionModel.aggregate([
        {
            $match: {
                yearMonth: date,
                description: { $regex: new RegExp(filter), $options: 'i' },
                type: "-"
            }
        },
        {
            $group: {
                _id: null,
                releases: { $sum: 1 },
                expense: { $sum: "$value" }
            }
        }
    ]);
}

const dashBoardCalculate = (expenses, revenues) => {
    const expenseRealeases = expenses[0].releases;
    const revenueRealeases = revenues[0].releases;
    const revenueValue = revenues[0].revenue;
    const expenseValue = expenses[0].expense;
    const releases = expenseRealeases + revenueRealeases;
    const total = revenueValue - expenseValue;

    return {quantidade: releases, receitas: revenueValue, despesas: expenseValue, total: total};
}

const mountTransactionModel = (transaction) => {
    transaction.period = transaction.period.replace('-', '/');

    let period = new Date(moment(transaction.period, "DD/MM/YYYY"));    

    const dayCurrent = extensionShared.getDayFormat(period);
    const monthCurrent = extensionShared.getMonthFormat(period);
    const yearCurrent = period.getFullYear();

    const model = new TransactionModel();

    model.description = transaction.description,
    model.value = transaction.value,
    model.category = transaction.category,
    model.year = yearCurrent,
    model.month = monthCurrent,
    model.day = dayCurrent,
    model.yearMonth = `${yearCurrent}-${monthCurrent}`,
    model.yearMonthDay = `${yearCurrent}-${monthCurrent}-${dayCurrent}`,
    model.type = transaction.type

    return model;
}


module.exports = { 
    getRevenues, 
    getExpenses,
    dashBoardCalculate, 
    mountTransactionModel,
    DEFAULT_VALUE_REVENUE, 
    DEFAULT_VALUE_EXPENSE
};