import React from "react";
import { Link } from "react-router-dom";

function Login() {
	return (
		<>
			<h1>Login</h1>

			<form action="/login/process">
				<div className="username">
					<label htmlFor="username-input"> Username:</label>
					<input
						type="text"
						name="username"
						id="username-input"
						autoComplete="username"
					/>
				</div>

				<div className="password">
					<label htmlFor="password-input"> Password:</label>
					<input
						type="password"
						name="password"
						id="password-input"
						autoComplete="current-password"
					/>
				</div>

				<button type="submit">Login</button>
			</form>

			Don't have an account yet? <Link to='/register'>Click here to register.</Link>
		</>
	);
}

export default Login;
