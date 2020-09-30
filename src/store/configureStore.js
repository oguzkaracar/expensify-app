import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ; 
// asycn actionlar kullanmak için ....

export default () => {
	// Store creation
	// combineReducer kullanınca, store a dispatch edilen action, storedaki tüm reducerlar içindeki case'lere bakar ve eşleşen ile devam eder ve oradaki store'u veya state'i günceller...

	const store = createStore(
		combineReducers({
			expenses: expensesReducer,
			filters: filtersReducer,
		}),
		 composeEnhancers(applyMiddleware(thunk))
		// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

	return store;
};
