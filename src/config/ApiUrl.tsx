const API_URL = {
	LOGIN_WITH_EMAIL: "auth/login",
	REGISTER_WITH_EMAIL: "register",
	ME: "me",
	LOGOUT: "logout",
	VERIFY_ACCOUNT: (verification_code: string): string =>
		"verify-email/" + verification_code,
	RESEND_VERIFICATION_LINK: (email: string): string =>
		"resend-verification-code/" + btoa(email),
	USER: {
		LIST: "user/list",
	},
	All_TRANSACTION: {
		LIST: "trade/transactions/list",
	},
};

export default API_URL;
