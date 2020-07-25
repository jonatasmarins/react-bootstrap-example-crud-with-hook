import React, { useState, useEffect } from 'react';
import css from './css/App.module.css';
import Header from './components/Header';
import DateSelect from './components/DateSelect';
import DashBoard from './components/DashBoard';
import NewTransaction from './components/NewTransaction';
import Filter from './components/Filter';
import service from './services/TransactionService';
import { getDefaultValue } from './data/DateOption.js';
import Transactions from './components/Transactions';
import { dateOptions } from './data/DateOption.js';

export default function App() {

  const [dashBoardInfo, setDashBoardInfo] = useState({ quantidade: 0, receitas: 0, despesas: 0, total: 0 });
  const [listTransactions, setListTransactions] = useState([]);
  const [periodSelected, setPeriodSelected] = useState("");

  useEffect(async () => {
    const periodDefault = getDefaultValue();

    await onChangeDateSelect(periodDefault.value);
    await getTransactionByPeriod(periodDefault.value);
  }, [])

  useEffect(() => {
    const period = dateOptions.find(x => x.selected === true);
    if (period != periodSelected) {
      setPeriodSelected(period.value);
    }
  }, [listTransactions])

  const onChangeDateSelect = async (period) => {
    await setPeriodDashBoard(period, "");
    await getTransactionByPeriod(period);

    setPeriodSelected(period);
  }

  const setPeriodDashBoard = async (period, description = "") => {
    const dashboard = await service.getDashBoard(period, description);
    setDashBoardInfo(dashboard.data.content);
  }

  const getTransactionByPeriod = async (period) => {
    const transactionByPeriod = await service.getTransactionByPeriod(period);
    setListTransactions(transactionByPeriod.data.content);
  }

  const getTransactionByDescription = async (period, description) => {
    const transactionByDescription = await service.getTransactionByDescription(period, description);
    setListTransactions(transactionByDescription.data.content);
  }

  const onRefresh = async () => {
    console.log(periodSelected)
    await onChangeDateSelect(periodSelected);
    await getTransactionByPeriod(periodSelected);
  } 

  const filterTransactions = async (inputFilter) => {

    const period = dateOptions.find(x => x.selected === true);

    if (period) {
      if (inputFilter) {
        await getTransactionByDescription(period.value, inputFilter);
      } else {
        await getTransactionByPeriod(period.value);
      }
    }
  }

  const getViewListTransaction = () => {
    if (listTransactions && listTransactions?.length > 0) {
      return (<Transactions transactions={listTransactions} refresh={onRefresh} />);
    } else {
      return (<div>Nenhuma transação encontrada !</div>);
    }
  }

  return (
    <>
      <div className="container">
        <Header
          title="BootCamp Full Stack - Desafio Final"
          subTitle="Controle Financeiro Pessoal"
        />
        <DateSelect onChangeDateSelect={onChangeDateSelect} />
        <DashBoard properties={dashBoardInfo} />
        <div className={css.principal}>
          <div className={css.newTransaction}>
            <NewTransaction refresh={onRefresh}/>
          </div>
          <div className={css.filter}>
            <Filter onChangerFilter={filterTransactions} period={periodSelected} />
          </div>
        </div>
        {getViewListTransaction()}
      </div>
    </>
  )
}


