import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenses from '../selectors/expenses';
import ExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
	const totalExpense = numeral(expensesTotal / 100).format("$0,0.00");
    const expenseWord = expenseCount === 1 ? "expense" : "expenses";
	return (
		<div>
			<h1>
				Viewing {expenseCount} {expenseWord} totalling {totalExpense}
			</h1>
		</div>
	);
};

const mapStateToProps = (state)=>{
    const visibleExpenses = selectExpenses(state.expenses, state.filters);

    return {
        expenseCount: visibleExpenses.length,
        expensesTotal:ExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary);