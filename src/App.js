import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import { LoginPage, RegisterPage } from "./pages/auth";
import { PublicLayout, Unauthorized, Missing } from "./pages/global";
import RequireAuth from "./features/auth/RequireAuth";
import Test from "./pages/test/Test";
import AuthVerify from "./common/AuthVerify";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./features/auth/authSlice";
import { AxiosInterceptor } from "./hooks/privateAxios";
import PersistLogin from "./features/auth/PersistLogin";

const ROLES = {
	USER: "USER",
	ADMIN: "ADMIN",
};

const App = () => {
	const dispatch = useDispatch();
	const logOut = useCallback(() => {
		dispatch(logout());
	}, [dispatch]);

	return (
		<AxiosInterceptor>
			<Routes>
				<Route path="/" element={<PublicLayout />}>
					{/* public routes */}
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegisterPage />} />
					<Route path="unauthorized" element={<Unauthorized />} />

					{/* protected routes */}
					<Route element={<PersistLogin />}>
						<Route
							element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN]} />}
						>
							<Route index element={<Test />} />
							<Route path="test" element={<Test />} />
						</Route>
					</Route>

					{/* catch all */}
					<Route path="*" element={<Missing />} />
				</Route>
			</Routes>
			<ToastContainer
				position="top-right"
				autoClose={500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			{/* <AuthVerify logOut={logOut} /> */}
		</AxiosInterceptor>
	);
};

export default App;
