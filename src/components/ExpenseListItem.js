import React from "react";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { removeExpense } from "../actions/expenses";

// zaten bir üst componentten props aldığımız için connect metodu için statetoProps fonksiyonu oluşturmamıza gerek yokk..
// {id, description, amount, createdAt }

// propstan gelen objeyi destructuring yaparak valueları aldık...
export const ExpenseListItem = ({ id, description, amount, createdAt }) => (
	<div>
		<Link to={`/edit/${id}`}>
			<h3>{description}</h3>
		</Link>
		<p>
			Expense= amount: {amount} - createdAt: {createdAt}
		</p>
	</div>
);

export default ExpenseListItem;
