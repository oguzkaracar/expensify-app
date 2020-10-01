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
		case 'SET_EXPENSES':
			return action.expenses;
		default:
			return state;
	}
};

export default expensesReducer;