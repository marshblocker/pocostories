import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { loginUser } from "../services/userService";
import { storeBasicAuthInCookie } from "../services/authService";

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

				let userInfo = await loginUser(username, password);
				storeBasicAuthInCookie(userInfo.username, 4);
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
