import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import HomePage from "../components/HomePage";
import AddExpense from "../components/AddExpense";
import EditExpense from "../components/EditExpense";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createHistory();

const AppRouter = () => (
	<Router history={history}>
		<div>
			{/* Switch aranan route u bulduğunda diğerlerine bakmaz. Eğer aranan route bulunamazsa en sondaki 404 routeunu çalıştırır. */}
			<Switch>
				<PublicRoute path="/" component={LoginPage} exact />
				<PrivateRoute path="/dashboard" component={HomePage} />
				<PrivateRoute path="/create" component={AddExpense} />
				<PrivateRoute path="/edit/:id" component={EditExpense} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</Router>
);

export default AppRouter;
