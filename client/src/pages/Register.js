import React from "react";

function Login() {
	return (
		<div style={{margin: "1rem"}}>
			<h1>Register</h1>

			<form action="/register/process">
				<div className="username">
					<label htmlFor="username-input"> Username:</label>
					{" "}
					<input
						type="text"
						name="username"
						id="username-input"
						autoComplete="username"
						maxLength={20}
						required
					/>
				</div>

				<div className="password">
					<label htmlFor="password-input"> Password:</label>
					{" "}
					<input
						type="password"
						name="password"
						id="password-input"
						autoComplete="new-password"
						maxLength={20}
						required
					/>
				</div>

				<div className="repeat-password">
					<label htmlFor="password-input"> Repeat Password:</label>
					{" "}
					<input
						type="password"
						name="repeat-password"
						id="repeat-password-input"
						autoComplete="new-password"
						maxLength={20}
						required
					/>
				</div>

				<button type="submit">Register</button>
			</form>
		</div>
	);
}

export default Login;
