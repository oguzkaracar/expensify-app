import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import { addExpense } from "./actions/expenses";

const store = configureStore();
store.dispatch(addExpense({description:'deneme',note:'deneme notu',amount:12500,createdAt:1254554844}));
store.dispatch(addExpense({description:'deneme-2',note:'deneme notu-2',amount:1250,createdAt:125454848844}));

const App = ()=>{
	return(
		<div>
		<Provider store={store}>
			<AppRouter />
		</Provider>
	</div>
	)
}


ReactDOM.render(<App/>, document.getElementById("root"));
