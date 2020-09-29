import React from "react";
import { connect } from "react-redux";
import { editExpense, removeExpense } from "../actions/expenses";
import ExpenseForm from "./ExpenseForm";

const EditExpense = (props) => {
	// Route dan gelen props componente aktarlabiliyor. Bu şekilde url parametreleri, hash(#) parametleri ve query stringlerle işlemler yapabiliriz...
	return (
		<div>
			<ExpenseForm
				expense={props.expense}
				onSubmit={(expense) => {
					props.dispatch(editExpense(props.expense.id, expense));
					props.history.push("/");
				}}
			/>
			<button
				onClick={() => {
					props.dispatch(removeExpense({ id: props.expense.id })); // click eventında actionı çalıştırıp dispatch ile store a gönderdik..
					props.history.push("/");
				}}>
				Remove Expense
			</button>
		</div>
	);
};

const mapStateToProps = (state, props) => {
	return {
		expense: state.expenses.find((expense) => expense.id === props.match.params.id),
	};
};

export default connect(mapStateToProps)(EditExpense);
