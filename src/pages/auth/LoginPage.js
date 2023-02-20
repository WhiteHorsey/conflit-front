import { Button } from "react-bootstrap";
import FormTextField from "../../components/global/form-field";
import "./AuthCss.scss";
import { Form as FormikForm, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
	login,
	resetStatus,
	selectIsLoading,
} from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const loginFormSchema = yup.object({});
const loginInitialValues = {
	email: "user@gmail.com",
	password: "kun123456789+",
};

function LoginPage() {
	let navigate = useNavigate();
	const dispatch = useDispatch();

	const isLoading = useSelector(selectIsLoading);

	return (
		<div className="Auth-form-container">
			<Formik
				validationSchema={loginFormSchema}
				initialValues={loginInitialValues}
				onSubmit={(values, { resetForm }) => {
					dispatch(login(values))
						.unwrap()
						.then(() => {
							navigate("/");
							dispatch(resetStatus());
						});
					resetForm();
				}}
			>
				{({ handleSubmit, isValid, isSubmitting }) => (
					<FormikForm onSubmit={handleSubmit} className="Auth-form">
						<div className="Auth-form-content">
							<h3 className="Auth-form-title">Sign In</h3>
							<div className="form-group mt-3">
								<FormTextField
									controlId="validationFormik01"
									label="Email"
									type="text"
									name="email"
									placeholder="Enter Email"
								/>
							</div>
							<div className="form-group mt-3">
								<FormTextField
									controlId="validationFormik02"
									label="Password"
									type="password"
									name="password"
									placeholder="Enter password"
								/>
							</div>
							<div className="d-grid gap-2 mt-3">
								<Button
									disabled={!isValid || isSubmitting}
									variant="success"
									as="input"
									type="submit"
									value={isLoading ? "Loading ..." : "Login"}
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

export default LoginPage;
