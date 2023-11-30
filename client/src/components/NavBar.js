import React from "react";
import { Link } from "react-router-dom";

import './NavBar.css';

function NavBar() {
	return (
		<>
			<nav>
				<ol>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/user">User</Link>
					</li>
					<li>
						<Link to="/settings">Settings</Link>
					</li>
				</ol>
			</nav>
		</>
	);
}

export default NavBar;
