import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { CurrentUserContext } from "../contexts/context";

import "../styles/NavBar.css";

function NavBar() {
	const currentUser = useContext(CurrentUserContext);

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
					{
						currentUser === "" ?
						(
							<li>
								<Link to="/login">Login</Link>
							</li>
						) :
						(
							<li>
								<Link to="/logout">Logout</Link>
							</li>
						)
					}
					{currentUser === "" ? "" : <li>{currentUser}</li>}
				</ol>
			</nav>
		</>
	);
}

export default NavBar;
