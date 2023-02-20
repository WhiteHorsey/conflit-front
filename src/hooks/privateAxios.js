import axios from "axios";
import { store } from "../app/store";
import {
	logout,
	refreshToken,
	resetStatus,
	selectUser,
} from "../features/auth/authSlice.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const baseURL = "http://localhost:8080";

const instance = axios.create({
	baseURL: baseURL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

instance.interceptors.request.use(
	(config) => {
		const { getState } = store;
		const state = getState();
		config.headers["Authorization"] =
			"Bearer " + state.authStore.user?.accessToken;
		console.log(
			"config.headers['Authorization'] : " + config.headers["Authorization"]
		);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

const AxiosInterceptor = ({ children }) => {
	const navigate = useNavigate();
	const user = useSelector(selectUser);

	useEffect(() => {
		const responseInterceptor = instance.interceptors.response.use(
			(res) => res,
			async (err) => {
				const prevConfig = err?.config;
				const { dispatch, getState } = store;
				if (err.response) {
					if (err.response.status === 401 && !prevConfig._retry) {
						prevConfig._retry = true;
						try {
							console.log("AxiosInterceptor start");
							dispatch(refreshToken())
								.unwrap()
								.then(() => {
									console.log("authStore updated");
									dispatch(resetStatus());
									return instance(prevConfig);
								});
							// if (getState().authStore) {

							// }
						} catch (_error) {
							console.log("logout refresh token expired");
							dispatch(logout()).then(() => navigate("/login"));
							toast.error("refresh expired");
							return Promise.reject(err.response.data);
						}
					}
					if (err.response.status === 403 && err.response.data) {
						toast.error("403");
						return Promise.reject(err.response.data);
					}
				}
				return Promise.reject(err);
			}
		);

		return () => {
			instance.interceptors.response.eject(responseInterceptor);
		};
	}, [navigate]);

	return children;
};

export default instance;
export { AxiosInterceptor };
