import React from 'react';

const Statistics = ({ transactions }) => {
    const total = transactions.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div>
            <h2>Total Transactions Amount: {total}</h2>
        </div>
    );
};

export default Statistics;
