import * as yup from "yup";

export const loginFormSchema = yup.object({
	name: yup
		.string()
		.max(20, "Name must be 20 characters or less.")
		.required("Name is required"),
	email: yup
		.string()
		.email("Invalid email address")
		.required("Email is required"),
	terms: yup.array().required("Terms of service must be checked"),
});

export const loginInitialValues = {
	name: "",
	email: "",
	country: "United Kingdom",
	terms: "",
};
