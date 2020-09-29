import { createStore, combineReducers } from "redux";
import { v4 as uuid } from "uuid";

// içecek reduce fonksiyonu..
//  const drinkReducer = (state = "kahve", action) => {
// 	switch (action.type) {
// 		case "UPDATE_DRINK":
// 			return action.payload;
// 		default:
// 			return state;
// 	}
// }

// // yiyecek reduce fonksiyonu.
// const foodReducer = (state="elma", action)=>{
//     switch(action.type){
//         case 'UPDATE_FOOD':
//             return action.payload;
//         default:
//             return state;
//     }
// }

// const updateFoodDatas = { // action objesi..
//     type:"UPDATE_FOOD",
//     payload:"armut",
// }

// const updateDrinkDatas = {
// 	type: "UPDATE_DRINK",
// 	payload: "cay",
// };

// // combineReducers ile birden fazla reducer fonksiyon çıktısını tek bir store objesi olarak geri döndürüyor...
// const reducers = combineReducers({
//     foods: foodReducer,
//     drinks: drinkReducer
// });

// const store = createStore(reducers);

// console.log(typeof reducers);
// console.log('Action eklenmeden önceki: ',store.getState()); // {foods: "elma", drinks: "kahve"}
// store.dispatch(updateFoodDatas,updateDrinkDatas); // dispatch metoduna birden fazla action gönderebiliriz...
// console.log(store.getState()); // {foods: "armut", drinks: "kahve"}

// ********************************************* Expenses app örneği combineReducerlar..... ******************************

// ***--- Actions -----****

// ADD_EXPENSE
const addExpense = ({ description = "", note = "", amount = 0, createdAt = 0 } = {}) => ({
	type: "ADD_EXPENSE",
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt,
	},
});

// REMOVE_EXPENSE
const removeExpense = ( id='') => ({
	type: "REMOVE_EXPENSE",
	id,
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
	type: "EDIT_EXPENSE",
	id,
	updates,
});

// SET_TEXT_FIELD
const setTextFilter = (text = "") => ({
	type: "SET_TEXT_FIELD",
	text,
});

// SORT_BY_DATE
const sortByAmount = () => ({
	type: "SORT_BY_AMOUNT",
});

// SORT_BY_AMOUNT
const sortByDate = () => ({
	type: "SORT_BY_DATE",
});

// SET_START_DATE
const setStartDate = (startDate) => ({
	type: "SET_START_DATE",
	startDate,
});

// SET_END_DATE
const setEndDate = (endDate) => ({
	type: "SET_END_DATE",
	endDate,
});

// Expenses Reducer

const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case "ADD_EXPENSE":
			// return state.concat(action.expense); // push kullanmama sebebimiz orijinal arrayi değiştirmesidir.. Bizde bunun olmasını istemiyoruz...
			return [
				...state, // önceki state(expense array)
				action.expense, // (yeni eklenen)
				// spread operator kullanarak, array.concat işleminin aynısını yapmış olduk...
			];
		case "REMOVE_EXPENSE":
			return state.filter(({ id }) => id !== action.id);
		// filter ile silmek istediğimiz expense'i bulduk ve arrayden filter ile çıkararak yeni arrayi döndürdük..
		case "EDIT_EXPENSE":
			return state.map((expense) => {
				if (expense.id === action.id) {
					return {
						...expense,
						// amount:action.updates.amount
						...action.updates,
						// burada obje içindeki amount propertisi objeye eklenmiş ve override edilmiş oldu... object spread operator kullandık...
					};
				} else {
					return expense;
				}
			});

		default:
			return state;
	}
};

// filters Reducer

const filtersReducerDefaultState = {
	text: "",
	sortBy: "date",
	startDate: undefined,
	endDate: undefined,
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

// Get visible expenses - Store datalarını filtrelemek için...
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
	return expenses
		.filter((expense) => {
			const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
			const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate;
			const endDateMatch = typeof endDate !== "number" || expense.createdAt <= endDate;

			return textMatch && startDateMatch && endDateMatch;
		})
		.sort((a, b) => {
			if (sortBy === "date") {
				return a.createdAt < b.createdAt ? 1 : -1;
			}
			else if(sortBy === "amount"){
				return a.amount < b.amount ? 1 : -1;
			}
		});
		// filtreleme ve sort işlemleri yaptıktan sonra storedan sadece expenses objesini göndermiş olduk.. Kullanııcı bu verileri görecek...
};

// Store creation
const reducers = combineReducers({
	expenses: expensesReducer,
	filters: filtersReducer,
	// combineReducer kullanınca, store a dispatch edilen action, storedaki tüm reducerlar içindeki case'lere bakar ve eşleşen ile devam eder ve oradaki store'u veya state'i günceller..
});

const store = createStore(reducers);

store.subscribe(() => {
	const state = store.getState();
	// console.log(state);
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: "Kira ödemesi", amount: 850, createdAt: 13000 }));
const expenseTwo = store.dispatch(addExpense({ description: "Fatura öde", amount: 200, createdAt: 2000 }));

store.dispatch(removeExpense(expenseOne.expense.id));
store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));

store.dispatch(setTextFilter('öde'));

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

store.dispatch(setStartDate(0));
//store.dispatch(setStartDate());
store.dispatch(setEndDate(200));

// verimiz, buradan birden fazla State verisi oluşturucaz...
// const demoState = {
// 	expenses: [
// 		{
// 			id: "oasdo!sA23",
// 			description: "Kira ödemesi",
// 			note: "Fazladan bir kira ödemesi yapıldı..",
// 			amount: 850,
// 			createdAt: 0,
// 		},
// 	],
// 	filters: {
// 		text: "rent",
// 		sortBy: "amount", // date or amount
// 		startDate: undefined,
// 		endDate: undefined,
// 	},
// };
