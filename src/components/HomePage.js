import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';


const HomePage = () => {
	return (
		<div>
			<h1>Dashboard Page</h1>
			<ExpenseListFilters/>
			<ExpenseList/>
		</div>
	);
};

export default HomePage;