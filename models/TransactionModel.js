const mongoose = require('mongoose');

let schema = mongoose.Schema({
  description: {
    type: String,
    required: [true, "Campo Descrição é obrigatório"]
  },
  value: {
    type: Number,
    required: [true, "Campo Valor é obrigatório"],
    min: [0.1, "Valor não pode ser zero"]
  },
  category: {
    type: String,
    required: [true, "Campo Categoria é obrigatório"]
  },
  year: {
    type: Number,
    required: [true, "Campo Ano é obrigatório"]
  },
  month: {
    type: Number,
    required: [true, "Campo Mês é obrigatório"]
  },
  day: {
    type: Number,
    required: [true, "Campo Dia é obrigatório"]
  },
  yearMonth: {
    type: String,
    required: [true, "Campo Ano/Mês é obrigatório"]
  },
  yearMonthDay: {
    type: String,
    required: [true, "Campo Ano/Mês/Dia é obrigatório"]
  },
  type: {
    type: String,
    required: [true, "Campo Type é obrigatório"]
  },
}, 
{ versionKey: false });

const TransactionModel = mongoose.model('transaction', schema);

module.exports = TransactionModel;
