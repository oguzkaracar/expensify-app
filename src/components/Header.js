import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
	return (
		<header>
			<Link to="/">
				<h1>Expensify</h1>
			</Link>
			<div>
				<ul>
					<li>
						<NavLink to="/" activeClassName="is-active" exact>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/create" activeClassName="is-active">
							Create Expense
						</NavLink>
					</li>
					{/* <li>
						<NavLink to="/edit" activeClassName="is-active">
							Edit Expense
						</NavLink>
					</li> */}
					{/* <li>
						<NavLink to="/help" activeClassName="is-active">
							Help
						</NavLink>
					</li> */}
				</ul>
			</div>
		</header>
	);
};

export default Header;
