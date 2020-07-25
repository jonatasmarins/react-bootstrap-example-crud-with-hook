import React, { useEffect, useState } from 'react'
import Transaction from './Transaction';

export default function Transactions({ transactions, refresh }) {

    const [rowsTransactions, setRowsTransactions] = useState([]);

    const getTransactions = () => {
        const rows = [];
        if (transactions && transactions?.length > 0) {
            for (let index = 0; index < transactions.length; index++) {
                const transaction = transactions[index];
                rows.push(<Transaction transaction={transaction} index={index + 1} refresh={refresh} />);
            }
            setRowsTransactions(rows);
        }
    }

    useEffect(() => {
        getTransactions();
    }, [transactions])

    return (
        <div>
            {rowsTransactions}
        </div>
    )
}
