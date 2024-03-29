import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import userService from "../services/userService";
import handleError from "../error";

function ProcessRegister() {
	let [searchParams] = useSearchParams();
	let [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
	let navigate = useNavigate();

	let username = searchParams.get("username");
	let password = searchParams.get("password");
	let repeatPassword = searchParams.get("repeat-password");

	useEffect(() => {
		(async () => {
			try {
				if (
					username == null ||
					password == null ||
					repeatPassword == null
				) {
					alert("Invalid user information.");
					navigate("/register");
					return;
				}

				if (password !== repeatPassword) {
					alert("Password is not same with repeat password.");
					navigate("/register");
					return;
				}

				let newUser = await userService.registerUser(username, password);
				setIsRegisterSuccess(true);
			} catch (error) {
				handleError(error);
				navigate("/register");
			}
		})();
	}, [navigate, password, repeatPassword, username]);

	return (
		<div style={{margin: "1rem"}}>
			{isRegisterSuccess ? (
				<>
					<p>Register success</p>
					<Link to="/login">Login</Link> {" "}
					<Link to="/">Home</Link>
				</>
			) : (
				""
			)}
		</div>
	);
}

export default ProcessRegister;
