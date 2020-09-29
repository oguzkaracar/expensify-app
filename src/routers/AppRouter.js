import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "../components/HomePage";
import AddExpense from "../components/AddExpense";
import EditExpense from "../components/EditExpense";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";

const AppRouter = () => (
	<Router>
		<div>
			<Header />
			{/* Switch aranan route u bulduğunda diğerlerine bakmaz. Eğer aranan route bulunamazsa en sondaki 404 routeunu çalıştırır. */}
			<Switch>
				<Route path="/" component={HomePage} exact />
				<Route path="/create" component={AddExpense} />
				<Route path="/edit/:id" component={EditExpense}/>
				<Route path="/help" component={HelpPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</Router>
);

export default AppRouter;
