import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import FormTextField from "../../components/global/form-field";
import "./AuthCss.scss";
import { Form as FormikForm, Formik } from "formik";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { register, resetStatus, selectIsLoading } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

const loginFormSchema = yup.object({});
const loginInitialValues = {
	email: "test@gmail.com",
	firstName: "test",
	lastName: "test",
	phoneNumber: "0643536676",
	password: "kun123456789+",
};

function RegisterPage() {
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);

	return (
		<div className="Auth-form-container">
			<Formik
				validationSchema={loginFormSchema}
				initialValues={loginInitialValues}
				onSubmit={(values, { resetForm }) => {
					dispatch(register(values))
						.unwrap()
						.then(() => {
							navigate("/login");
							dispatch(resetStatus());
						});
					resetForm();
				}}
			>
				{({ handleSubmit, values, isValid, isSubmitting }) => (
					<FormikForm onSubmit={handleSubmit} className="Auth-form">
						<div className="Auth-form-content">
							<h3 className="Auth-form-title">Sign In</h3>
							<div className="text-center">
								Already registered?{" "}
								<NavLink className="custom-nav-link" to="/login">
									<span className="link-primary">Sign UP</span>
								</NavLink>
							</div>
							<div className="form-group mt-3">
								<FormTextField
									controlId="validationFormik01"
									label="firstName"
									type="text"
									name="firstName"
									placeholder="Enter firstName"
								/>
							</div>
							<div className="form-group mt-3">
								<FormTextField
									controlId="validationFormik02"
									label="lastName"
									type="text"
									name="lastName"
									placeholder="Enter lastName"
								/>
							</div>
							<div className="form-group mt-3">
								<FormTextField
									controlId="validationFormik03"
									label="phoneNumber"
									type="text"
									name="phoneNumber"
									placeholder="Enter phoneNumber"
								/>
							</div>
							<div className="form-group mt-3">
								<FormTextField
									controlId="validationFormik04"
									label="Email"
									type="email"
									name="email"
									placeholder="Enter Email"
								/>
							</div>
							<div className="form-group mt-3">
								<FormTextField
									controlId="validationFormik05"
									label="Password"
									type="password"
									name="password"
									placeholder="Enter password"
								/>
							</div>
							<div className="d-grid gap-2 mt-3">
								<Button
									disabled={!isValid || isSubmitting}
									variant="primary"
									as="input"
									type="submit"
									value={isLoading ? "Loading" : "Register"}
								/>
							</div>
							<p className="forgot-password text-right mt-2">
								Forgot <a href="#">password?</a>
							</p>
						</div>
					</FormikForm>
				)}
			</Formik>
		</div>
	);
}

export default RegisterPage;
