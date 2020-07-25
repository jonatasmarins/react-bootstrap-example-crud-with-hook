const TransactionModel = require('../models/TransactionModel');

const DATE_FORMAT_LENGTH = 7;
const DATE_SYMBOL_SEPARATOR = "-";
const MAX_DATE_END = new Date("2021/12/31");
const MIN_DATE_START = new Date("2019/01/01");

const MonthYearFormatValidator = (monthYear) => {
    if (!monthYear) {
        return "É necessário informar o parâmetro 'period', cujo o valor deve estar no formato yyyy-mm";
    }

    // const monthYearlength = monthYear.length;
    // if (monthYearlength !== DATE_FORMAT_LENGTH) {
    //     return "Tamanho inválido para o formato necessário do parâmetro 'period'";
    // }
}

const DescriptionValidator = (description) => {

    if (!description) {
        return "Descrição inválida ou em branco";
    }
}

const IdValidator = (id) => {

    if (!id) {
        return "Id inválido ou em branco";
    }
}

const CreateValidator = (transaction) => {
    const model = new TransactionModel();
    return TransactionValidator(model, transaction);
}

const UpdateValidator = (updateFilter, requestTransaction) => {
    return TransactionValidator(updateFilter, requestTransaction);
}

const TransactionValidator = (model, transaction) => {
    const messages = [];
    const result = { messages: messages, content: null };

    model.description = transaction.description,
    model.value = transaction.value,
    model.category = transaction.category,
    model.year = transaction.year,
    model.month = transaction.month,
    model.day = transaction.day,
    model.yearMonth = transaction.yearMonth,
    model.yearMonthDay = transaction.yearMonthDay,
    model.type = transaction.type

    const requiredValidator = model.validateSync();
    const dataValidator = DataRangeValidator(model.yearMonthDay);

    if (requiredValidator) {
        requiredValidator.errors['value'] && messages.push(requiredValidator.errors['value'].message);
        requiredValidator.errors['category'] && messages.push(requiredValidator.errors['category'].message);
        requiredValidator.errors['year'] && messages.push(requiredValidator.errors['year'].message);
        requiredValidator.errors['month'] && messages.push(requiredValidator.errors['month'].message);
        requiredValidator.errors['day'] && messages.push(requiredValidator.errors['day'].message);
        requiredValidator.errors['yearMonth'] && messages.push(requiredValidator.errors['yearMonth'].message);
        requiredValidator.errors['yearMonthDay'] && messages.push(requiredValidator.errors['yearMonthDay'].message);
        requiredValidator.errors['type'] && messages.push(requiredValidator.errors['type'].message);
    }

    dataValidator && messages.push(dataValidator);   

    result.content = model;

    return result;
}

const DataRangeValidator = (currentDate) => {
    const current = new Date(currentDate.replace("-", "/"));
    const teste = new Date("2019/01/02");

    if (current < MIN_DATE_START)
        return `Data é menor que a data mínima (${MIN_DATE_START})`;

    if (current > MAX_DATE_END)
        return `Data é maior que a data máxima (${MIN_DATE_START})`;
}

module.exports = { 
    MonthYearFormatValidator, 
    DescriptionValidator, 
    IdValidator, 
    TransactionValidator,
    CreateValidator,
    UpdateValidator
 };