import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";

// const now = moment();
// console.log(now.format("D MMM YYYY"));
// console.log(now.unix());

export default class ExpenseForm extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			description: props.expense ? props.expense.description : "",
			note: props.expense ? props.expense.note : "",
			amount: props.expense ? (props.expense.amount / 100).toString() : "",
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			calenderFocused: false,
			error: false,
		};
	}

	// input valuesu her değiştiğinde state değeri de güncellenecek..
	onDescriptionChange = (e) => {
		const description = e.target.value;
		this.setState(() => ({ description }));
	};

	// textarea valu değişimi ve state güncellemesi
	onNoteChange = (e) => {
		const note = e.target.value;
		this.setState(() => ({ note }));
	};
	// para miktarını alıp, istediğimiz formata çevirip, state değerini güncelleyecez..
	onAmountChange = (e) => {
		const amount = e.target.value;
		if (!amount || amount.match(/^\d{1,}(\.\d{0,2})$|^\d{1,}(\,\d{0,2})?$/)) {
			// ^\d*(\.\d{0,2})?$ -- sadece noktalı olan..
			this.setState(() => ({ amount }));
		}
	};

	// Date change - state-change
	onDateChange = (createdAt) => {
		if (createdAt) {
			this.setState(() => ({ createdAt }));
		}
	};

	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calenderFocused: focused }));
	};

	// form submit edilince...
	onSubmit = (e) => {
		e.preventDefault();
		if (!this.state.description || !this.state.amount) {
			return this.setState(() => ({ error: true }));
		} else {
			this.setState(() => ({ error: false }));
			this.props.onSubmit({
				description: this.state.description,
				amount: parseFloat(this.state.amount, 10) * 100, // string gelen değeri float a çevirdik...
				note: this.state.note,
				createdAt: this.state.createdAt.valueOf(), // date bilgisini, unix epoch a çevirdik..
			});
		}
	};
	render() {
		return (
			<div>
				{this.state.error && <p>Please provide description and amount.</p>}
				Expense Form
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						placeholder="Description"
						autoFocus
						value={this.state.description}
						onChange={this.onDescriptionChange}
					/>
					<br />
					<input type="text" placeholder="Amount" value={this.state.amount} onChange={this.onAmountChange} />
					<br />
					<SingleDatePicker
						date={this.state.createdAt}
						onDateChange={this.onDateChange}
						focused={this.state.calenderFocused}
						onFocusChange={this.onFocusChange}
						numberOfMonths={1}
						isOutsideRange={() => false}
					/>
					<textarea
						placeholder="Add a note for your expense.(optional)"
						value={this.state.note}
						onChange={this.onNoteChange}></textarea>
					{this.props.expense ? <button>Edit Expense</button> : <button>Add Expense</button>}
				</form>
			</div>
		);
	}
}
