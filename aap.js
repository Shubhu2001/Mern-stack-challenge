
import TransactionsTable from './TransactionsTable';

// In the App.js render
<TransactionsTable transactions={transactions} />


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [transactions, setTransactions] = useState([]);
    const [month, setMonth] = useState('March');  // default month set to March

    // Fetch transactions when the component mounts or when the selected month changes
    useEffect(() => {
        axios.get(`/api/transactions?month=${month}`)
            .then(response => {
                setTransactions(response.data.transactions);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }, [month]);

    return (
        <div>
            <h1>Transactions for {month}</h1>
            <select value={month} onChange={e => setMonth(e.target.value)}>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
            </select>

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
        </div>
    );
}

export default App;
