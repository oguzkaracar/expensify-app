import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";

export const Header = ({ startLogout }) => {
	return (
		<header>
			<Link to="/dashboard">
				<h1>Expensify</h1>
			</Link>
			<div>
				<ul>
					<li>
						<NavLink to="/dashboard" activeClassName="is-active">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/create" activeClassName="is-active">
							Create Expense
						</NavLink>
					</li>
					<li>
						<button onClick={startLogout}>Logout</button>
					</li>
					{/* <li>
						<NavLink to="/edit" activeClassName="is-active">
							Edit Expense
						</NavLink>
					</li> */}
				</ul>
			</div>
		</header>
	);
};

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
