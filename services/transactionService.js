const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const validator = require('../validators/transactionValidator');
const TransactionModel = require('../models/TransactionModel');
const STATUS_CODE = require('../models/Enums/STATUS_CODE');
const extension = require('./extension/transactionServiceExtension');

const GetById = async (id) => {
    const messages = [];
    const result = { messages: messages, content: null, statusCode: STATUS_CODE.SUCCESS, success: true };

    const idValidator = validator.IdValidator(id);
    idValidator && messages.push(idValidator);

    if (messages.length === 0) {
        result.content = await TransactionModel.find({ _id: id });
    } else {
        result.statusCode = STATUS_CODE.BAD_REQUEST;
        result.success = false;
    }

    return result;
}

const GetByDate = async (date) => {
    const messages = [];
    const result = { messages: messages, content: null, statusCode: STATUS_CODE.SUCCESS, success: true };

    const datevalidator = validator.MonthYearFormatValidator(date);
    datevalidator && messages.push(datevalidator);

    if (messages.length === 0) {
        result.content = await TransactionModel.find({ yearMonth: date });
    } else {
        result.statusCode = STATUS_CODE.BAD_REQUEST;
        result.success = false;
    }

    return result;
};

const GetByDateAndDescription = async (date, filter) => {
    const messages = [];
    const result = { messages: messages, content: null, statusCode: STATUS_CODE.SUCCESS, success: true };

    const msgDate = validator.MonthYearFormatValidator(date);
    const msgDescription = validator.DescriptionValidator(filter);

    msgDate && messages.push(msgDate);
    msgDescription && messages.push(msgDescription);

    if (messages.length === 0) {
        const conditions = { yearMonth: date, description: { $regex: new RegExp(filter), $options: 'i' } };
        result.content = await TransactionModel.find(conditions);
    } else {
        result.success = false;
        result.statusCode = STATUS_CODE.BAD_REQUEST;
    }

    return result;
};

const GetDashBoard = async (date, filter) => {
    const messages = [];
    const result = { messages: messages, content: null, statusCode: STATUS_CODE.SUCCESS, success: true };

    const msgDate = validator.MonthYearFormatValidator(date);
    msgDate && messages.push(msgDate);

    if (messages.length === 0) {
        const revenues = await extension.getRevenues(date, filter);
        const expenses = await extension.getExpenses(date, filter);

        if (expenses.length === 0) {
            expenses.push(extension.DEFAULT_VALUE_EXPENSE);
        }

        if (revenues.length === 0) {
            revenues.push(extension.DEFAULT_VALUE_REVENUE);
        }

        result.content = extension.dashBoardCalculate(expenses, revenues);
    } else {
        result.success = false;
        result.statusCode = STATUS_CODE.BAD_REQUEST;
    }

    return result;
};

const Delete = async (id) => {
    const messages = [];
    const result = { messages: messages, content: null, statusCode: STATUS_CODE.SUCCESS, success: true };

    const idValidator = validator.IdValidator(id);
    idValidator && messages.push(idValidator);

    const exist = await TransactionModel.find({ _id: id });

    if (exist && exist.length > 0) {
        if (messages.length === 0) {
            result.content = await TransactionModel.findOneAndDelete({ _id: id });
        } else {
            result.statusCode = STATUS_CODE.BAD_REQUEST;
            result.success = false;
        }
    } else {
        result.messages.push("Transação não encontrada");
        result.statusCode = STATUS_CODE.NOT_FOUND;
        result.success = false;
    }



    return result;
}

const Create = async (transaction) => {
    try {
        const result = { messages: [], content: null, statusCode: STATUS_CODE.SUCCESS, success: true };

        const transactionModel = extension.mountTransactionModel(transaction);

        const createValidator = validator.CreateValidator(transactionModel);
        result.messages = createValidator && createValidator.messages;

        if (result.messages.length === 0) {
            result.content = await TransactionModel.create(transactionModel);
        } else {
            result.statusCode = STATUS_CODE.BAD_REQUEST;
            result.success = false;
        }

        return result;
    } catch (error) {
        console.log(error);
    }
}

const Update = async (transaction) => {
    const result = { messages: [], content: null, statusCode: STATUS_CODE.SUCCESS, success: true };

    const documentFilter = await TransactionModel.findOne({ _id: transaction._id });

    if (documentFilter) {
        const transactionModel = extension.mountTransactionModel(transaction);
        const updateValidator = validator.UpdateValidator(documentFilter, transactionModel);
        result.messages = updateValidator && updateValidator.messages;

        if (result.messages.length === 0) {
            updateValidator.content.save();
            result.content = updateValidator;
        } else {
            result.statusCode = STATUS_CODE.BAD_REQUEST;
            result.success = false;
        }
    } else {
        result.messages.push("Transação não encontrada");
        result.statusCode = STATUS_CODE.NOT_FOUND;
        result.success = false;
    }

    return result;
}

module.exports = {
    GetByDate,
    GetByDateAndDescription,
    GetDashBoard,
    GetById,
    Delete,
    Create,
    Update
};
