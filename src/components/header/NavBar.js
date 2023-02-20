import React, { useCallback } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../features/auth/authSlice";

function NavBar() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const signout = async () => {
		dispatch(logout());
		// navigate("/test");
	};
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand style={{ paddingTop: 0 }}>
					<NavLink className="custom-nav-link" to="/">
						BaseSocle
					</NavLink>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<NavLink className="custom-nav-link" to="/test">
							for users
						</NavLink>

						<NavLink className="custom-nav-link" to="/passports">
							for admins
						</NavLink>
					</Nav>

					<Nav>
						{user ? (
							<p className="custom-nav-link" onClick={signout}>
								Logout
							</p>
						) : (
							<>
								<NavLink className="custom-nav-link" to="/login">
									Login
								</NavLink>

								<NavLink className="custom-nav-link" to="/register">
									Register
								</NavLink>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
