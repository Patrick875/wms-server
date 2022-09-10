import * as yup from "yup";

export const loginSchema = yup.object({
	email: yup.string().required().email(),
	password: yup.string().required(),
});
export const signUpSchema = yup.object({
	names: yup.string().required().min(3).max(20),
	//email: yup.string().required().email(),
	password: yup.string().required(),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match"),
	terms: yup.bool().oneOf([true], "Please agree to terms and conditions"),
	// gender: yup.string().required(),
	telephone: yup.string().required().min(10).max(10),
	nationalId: yup
		.string()
		.required()
		.min(16)
		.max(16, "National ID must be 16 characters"),
});
