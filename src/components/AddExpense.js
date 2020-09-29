import React from "react";
import { connect } from "react-redux";
import { addExpense } from "../actions/expenses";
import ExpenseForm from "./ExpenseForm";

const AddExpense = (props) => {
	return (
		<div>
			<h2>Welcome to Create Expense Page</h2>
			<ExpenseForm
				onSubmit={(expense) => {
					props.dispatch(addExpense(expense));
					props.history.push("/");
				}}
			/>
		</div>
	);
};

export default connect()(AddExpense);
