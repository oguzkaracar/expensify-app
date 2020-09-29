import filtersReducer from "../../reducers/filters";
import moment from 'moment';

// default filter reducer test ==> state direkt dönecek..
test("should setup default filter values", () => {
	const state = filtersReducer(undefined, { type: "@@INIT" }); //@INIT - redux da default olarak tetiklenen action...
	expect(state).toEqual({
		text: "",
		sortBy: "date",
		startDate: undefined, //moment().startOf('month'),
		endDate: undefined, // moment().endOf('month'),
	});
});

// sortBy amount action test
test('should set sortBy to amount',()=>{
    const state = filtersReducer(undefined,{type:'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
})

// sortBy date action test
test('should set sortBy to date',()=>{
    const state = filtersReducer(undefined,{type:'SORT_BY_DATE'});
    expect(state.sortBy).toBe('date');
})

// set-text-field test case
test('should setTextField to state', ()=>{
    const state = filtersReducer(undefined,{type:'SET_TEXT_FIELD', text:'deneme'});
    expect(state.text).toBe('deneme');
})

// SET_START_DATE
test('should set startDate to state',() =>{
    const startDate = moment();
    const state = filtersReducer(undefined,{type:'SET_START_DATE', startDate});
    expect(state.startDate).toEqual(startDate);
})

// SET_END_DATE

test('should set startDate to state',() =>{
    const endDate = moment();
    const state = filtersReducer(undefined,{type:'SET_END_DATE', endDate});
    expect(state.endDate).toEqual(endDate);
})