import React from "react";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from "../actions/filters";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";


class ExpenseListFilters extends React.Component {
	state = {
		calendarFocused: null,
	};

	onDatesChange = ({ startDate, endDate }) => {
		this.props.dispatch(setStartDate(startDate));
		this.props.dispatch(setEndDate(endDate));
		// tarih seçme işlemi yapılmaya başlandığı anda sortByDate çalışıcak...
		this.props.dispatch(sortByDate());
	};

	onFocusChange = (calendarFocused) => {
		// focus işlemi bittikten sonra, yani datepicker kapanınca ya da açılınca state değişikliği olucak..
		this.setState(() => ({ calendarFocused }));
	};

	render() {
		return (
			<div>
				<input
					type="text"
					value={this.props.filters.text}
					onChange={(e) => {
						this.props.dispatch(setTextFilter(e.target.value));
						// inputtan aldığımız değeri dispatch ile daha önce oluşturduğumuz action a aktardık ve filtreleme işlemi yapmış olduk..
					}}></input>
				<select
					value={this.props.filters.sortBy}
					onChange={(e) => {
						const value = e.target.value;
						if (value === "date") {
							// date default filtreleme ama start ve end date tanımlaması yapmadık..
							this.props.dispatch(sortByDate());
						} else if (value === "amount") {
							// tarihe göre filtrelemeyi sıfırladık.
							this.props.dispatch(setStartDate());
							this.props.dispatch(setEndDate());
							// amount a göre seçme action'ı çalışacak..
							this.props.dispatch(sortByAmount());
						}
					}}>
					<option value="date">Date</option>
					<option value="amount">Amount</option>
				</select>
				<DateRangePicker
					startDate={this.props.filters.startDate}
					startDateId={uuid()}
					endDate={this.props.filters.endDate}
					endDateId={uuid()}
					onDatesChange={this.onDatesChange}
					focusedInput={this.state.calendarFocused}
					onFocusChange={this.onFocusChange}
					numberOfMonths={1}
					isOutsideRange={() => false}
					showClearDates={true}
					showDefaultInputIcon={true}
				/>
			</div>
		);
	}
}

// redux connect metodu ile state erişimi sağladık.
const mapStateToProps = (state) => {
	return {
		filters: state.filters,
	};
};

export default connect(mapStateToProps)(ExpenseListFilters);
