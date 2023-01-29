import React from "react";
import Header from "../components/header";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "../customHooks/useForm";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../actions/loginAction";

function Signup() {
  const { handleChange, userDetails } = useForm();
  const isLoggedIn = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  return isLoggedIn ? (
		<Redirect to="/chatpage" />
  ) : (
		<>
			<div className="form-page">
				<Header />
				<div className="form-container">
					<form className="form">
						<div className="form-title">{/* user icon */}Signup</div>
						<div className="username">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								required
								name="email"
								className="login-username"
								onChange={handleChange}
								autoComplete="new-user"
							/>
						</div>
						<div className="password">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								onChange={handleChange}
								autoComplete="new-password"
							/>
						</div>
						<div className="form-submit">
							<input
								type="button"
								required
								className="submit"
								onClick={() => dispatch(signUp(userDetails))}
								value="submit"
							/>
							<input
								type="button"
								required
								className="submit"
								onClick={() =>
									dispatch(
										signUp({
											email: `guest${Date.now()}@gmail.com`,
											password: "defaultPassword",
										})
									)
								}
								value="sign up as guest"
							/>
						</div>
						<div className="form-switch">
							switch to <Link to="/login">Log in</Link>
						</div>
					</form>
				</div>
			</div>
		</>
  );
}

export default Signup;
