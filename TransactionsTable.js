import React from 'react';

const TransactionsTable = ({ transactions }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.date}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionsTable;
