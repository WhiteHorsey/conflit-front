import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, selectUser } from "../../features/auth/authSlice";
import axios from "../../hooks/privateAxios";

const Test = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	let [message, setMessage] = useState("");
	useEffect(() => {
		const getTest = async () => {
			const { data } = await axios.get("/api/test");
			setMessage(data);
		};
		getTest();
	}, []);

	return (
		<div>
			<button
				onClick={() => {
					dispatch(refreshToken());
				}}
			>
				refresh
			</button>
			<Container>
				<div>{"message : " + message}</div>
				<div style={{ overflowWrap: "break-word" }}>
					{"accessToken : " + user?.accessToken}
				</div>
			</Container>
		</div>
	);
};

export default Test;
