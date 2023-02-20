import axios from "../hooks/publicAxios";

const ROUTE_BASE = "/api/auth/";

const SIGNIN_ROUTE = ROUTE_BASE + "signIn";

const SIGNUP_ROUTE = ROUTE_BASE + "signUp";

const LOGOUT_ROUTE = ROUTE_BASE + "logout/";

const REFRESH_ROUTE = ROUTE_BASE + "refreshToken";

class AuthService {
	register(request) {
		return axios.post(SIGNUP_ROUTE, request);
	}

	login(request) {
		return axios.post(SIGNIN_ROUTE, request);
	}

	logout(userId) {
		return axios.post(LOGOUT_ROUTE + userId);
	}

	refresh() {
		return axios.post(REFRESH_ROUTE);
	}
}

export default new AuthService();
