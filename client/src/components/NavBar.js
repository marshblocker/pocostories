import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { CurrentUserContext } from "../contexts/context";

import "../styles/NavBar.css";

function NavBar() {
	const currentUser = useContext(CurrentUserContext);

	return (
		<>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<div className="collapse navbar-collapse">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="navbar-brand">
									pocostories
							</li>
							<li className="nav-item">
								<Link to="/" className="nav-link">
									Home
								</Link>
							</li>
							{currentUser === "" ? (
								<li className="nav-item">
									<Link to="/login" className="nav-link">
										Login
									</Link>
								</li>
							) : (
								<>
									<li className="nav-item">
										<Link to="/create-story" className="nav-link">
											Create Story
										</Link>
									</li>
									<li className="nav-item">
										<Link to={"/user/" + currentUser} className="nav-link">
											{currentUser}
										</Link>
									</li>
									<li className="nav-item">
										<Link to="/logout" className="nav-link">Logout</Link>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}

export default NavBar;
