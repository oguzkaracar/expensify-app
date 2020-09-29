import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

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
