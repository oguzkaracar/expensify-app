import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";
// Burada redux connect metodu şu işi yapıyor aslında; mapStateToProps ile işlediğimiz state, Provider’dan gelen store objesini connect kullanarak ExpenseList'e props olarak yerleştirmemizi sağlıyor.

export const ExpenseList = (props) => (
	<div>
		<h2>Expense List</h2>
		{props.expenses.length === 0 ? (
			<p>No expenses</p>
		) : (
			props.expenses.map((expense) => {
				return <ExpenseListItem key={expense.id} {...expense} />;
			})
		)}
	</div>
);

const mapStateToProps = (state) => {
	return {
		expenses: selectExpenses(state.expenses, state.filters),
	};
};

export default connect(mapStateToProps)(ExpenseList);
