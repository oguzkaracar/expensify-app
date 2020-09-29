import React from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import numeral from 'numeral';

// propstan gelen objeyi destructuring yaparak valueları aldık...
export const ExpenseListItem = ({ id, description, amount, createdAt }) => (
	<div>
		<Link to={`/edit/${id}`}>
			<h3>{description}</h3>
		</Link>
		<p>
		amount: {numeral(amount / 100).format('$0,0.00')} - createdAt: {moment(createdAt).format('D MMMM YYYY')}
		</p>
	</div>
);

export default ExpenseListItem;
