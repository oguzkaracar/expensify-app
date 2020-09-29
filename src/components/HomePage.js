import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary'


const HomePage = () => {
	return (
		<div>
			<h1>Dashboard Page</h1>
			<ExpensesSummary/>
			<ExpenseListFilters/>
			<ExpenseList/>
		</div>
	);
};

export default HomePage;