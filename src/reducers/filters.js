import moment from 'moment';
// filters Reducer

const filtersReducerDefaultState = {
	text: "",
	sortBy: "date",
	startDate: undefined, //moment().startOf('month'),
	endDate: undefined // moment().endOf('month'),
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case "SET_TEXT_FIELD":
			return {
				...state,
				text: action.text,
			};
		case "SORT_BY_AMOUNT":
			return {
				...state,
				sortBy: "amount",
			};
		case "SORT_BY_DATE":
			return {
				...state,
				sortBy: "date",
			};
		case "SET_START_DATE":
			return {
				...state,
				startDate: action.startDate,
			};
		case "SET_END_DATE":
			return {
				...state,
				endDate: action.endDate,
			};
		default:
			return state;
	}
};

export default filtersReducer;