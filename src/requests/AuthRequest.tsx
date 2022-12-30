import { RequestProps } from "../config/InterfacesAndTypes";
import Message from "../config/Message";
import { maxEmail, minEmail, Regex } from "../config/Validators";

export const RegisterRequest: RequestProps = {
	firstname: [{ required: true, message: Message().required.text("Firstname") }],
	lastname: [{ required: true, message: Message().required.text("Lastname") }],
	email: [
		{ required: true, message: Message().required.text("Email ID") },
		{ type: "email", message: Message().email("Email ID") },
		{
			min: minEmail,
			message: Message().min.string(minEmail, "Email ID"),
		},
		{
			max: maxEmail,
			message: Message().max.string(maxEmail, "Email ID"),
		},
	],
	password: [
		{ required: true, message: Message().required.text("Password") },
		{ pattern: Regex.password, message: Message().regex.password("Password") },
	],
};

export const LoginRequest: RequestProps = {
	email: [
		{ required: true, message: Message().required.text("Email ID") },
		{ type: "email", message: Message().email("Email ID") },
	],
	password: [{ required: true, message: Message().required.text("Password") }],
};
