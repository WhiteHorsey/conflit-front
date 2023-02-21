import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { refreshToken, resetStatus, selectUser } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		const verifyRefreshToken = async () => {
			dispatch(refreshToken())
				.unwrap()
				.then(() => setIsLoading(false));
		};
		// when reload page check if the accesstoken exist if not refresh
		// Avoids unwanted call to verifyRefreshToken
		!user?.accessToken ? verifyRefreshToken() : setIsLoading(false);
	}, []);

	return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
