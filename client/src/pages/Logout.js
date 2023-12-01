import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../services/authService";

function Logout({ setCurrentUser }) {
	const navigate = useNavigate();

	useEffect(() => {
		authService.deleteBasicAuthInCookie();
		setCurrentUser("");
		navigate("/");
	}, []);

	return <></>;
}

export default Logout;
