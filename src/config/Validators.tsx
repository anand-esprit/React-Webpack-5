export const Regex = {
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[0-9]).*$/,
	mobile: /^[0-9]+$/,
	twoDecimal: /^\d*(\.\d{0,2})?$/,
};

// /^(?=.*[0-9])/

export const minFirstName = 3;
export const maxFirstName = 50;
export const minLastName = 3;
export const maxLastName = 50;
export const minMobile = 8;
export const maxMobile = 20;
export const minEmail = 3;
export const maxEmail = 70;
export const minPassword = 8;
export const maxPassword = 20;
export const minName = 3;
export const maxName = 50;
