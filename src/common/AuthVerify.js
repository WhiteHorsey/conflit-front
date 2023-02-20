import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TokenService from "../services/TokenService";

const AuthVerify = ({ logOut }) => {
	let location = useLocation();

	useEffect(() => {
		const user = TokenService.getUser();
		if (user) {
			if (TokenService.isTokenExpired(user?.refreshToken)) {
				logOut();
			}
		}
	}, [location, logOut]);

	return;
};

export default AuthVerify;
