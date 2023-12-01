import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import userService from "../services/userService";
import authService from "../services/authService";

function ProcessLogin({ setCurrentUser }) {
	let [searchParams] = useSearchParams();
	let navigate = useNavigate();

	let username = searchParams.get("username");
	let password = searchParams.get("password");

	useEffect(() => {
		(async () => {
			try {
				if (username == null || password == null) {
					alert("Invalid credentials.");
					navigate("/login");
				}

				let userInfo = await userService.loginUser(username, password);
				authService.storeBasicAuthInCookie(userInfo.username, 4);
				setCurrentUser(username);
				navigate("/");
			} catch (error) {
				alert(error.response.data);
				navigate("/login");
			}
		})();
	}, []);

	return (
		<>
			<h1>Process Login</h1>
		</>
	);
}

export default ProcessLogin;
