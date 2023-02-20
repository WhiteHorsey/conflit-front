import jwt_decode from "jwt-decode";

class TokenService {
	getUser() {
		return JSON.parse(localStorage.getItem("user"));
	}

	getLocalRefreshToken() {
		return this.getUser()?.refreshToken;
	}

	getLocalAccessToken() {
		return this.getUser()?.accessToken;
	}

	updateLocalAccessToken(newAccessToken) {
		let user = this.getUser();
		user.accessToken = newAccessToken;
		localStorage.setItem("user", JSON.stringify(user, null, 2));
	}

	setUser(user) {
		localStorage.setItem("user", JSON.stringify(user));
	}

	removeUser() {
		localStorage.removeItem("user");
	}

	isTokenExpired(token) {
		return jwt_decode(token).exp < Date.now() / 1000;
	}
}

export default new TokenService();
