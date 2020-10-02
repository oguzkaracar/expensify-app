import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import { Link } from "react-router-dom";
import selectExpenses from "../selectors/expenses";
import ExpensesTotal from "../selectors/expenses-total";

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
	const totalExpense = numeral(expensesTotal / 100).format("$0,0.00");
	const expenseWord = expenseCount === 1 ? "expense" : "expenses";
	return (
		<div className="page-header">
			<div className="content-container">
				<h1 className="page-header__title">
					Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{totalExpense}</span>
				</h1>
				<div className="page-header__actions">
					<Link className="button" to="/create">Add Expense</Link>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	const visibleExpenses = selectExpenses(state.expenses, state.filters);

	return {
		expenseCount: visibleExpenses.length,
		expensesTotal: ExpensesTotal(visibleExpenses),
	};
};

export default connect(mapStateToProps)(ExpensesSummary);
