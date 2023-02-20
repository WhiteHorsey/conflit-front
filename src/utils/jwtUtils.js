import jwt_decode from "jwt-decode";

export const getUserIdFromAccessToken = (accessToken) => {
	return jwt_decode(accessToken).id;
};

export const getUserfromAccessToken = (accessToken) => {
	const { id, sub, firstName, lastName, phoneNumber, roles } =
		jwt_decode(accessToken);
	return {
		id,
		email: sub,
		firstName,
		lastName,
		phoneNumber,
		roles,
		accessToken,
	};
};
