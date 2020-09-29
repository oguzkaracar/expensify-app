import { createStore, combineReducers } from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";

export default () => {
	// Store creation
	const reducers = combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer,
		// combineReducer kullanınca, store a dispatch edilen action, storedaki tüm reducerlar içindeki case'lere bakar ve eşleşen ile devam eder ve oradaki store'u veya state'i günceller...
    });

    const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    
    return store;
};
