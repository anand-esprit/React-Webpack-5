export interface MessageProps {
	required: {
		text: (field: string) => string;
		select: (field: string) => string;
	};
	min: {
		string: (min: number, field: string) => string;
		select: (min: number, field: string) => string;
		numeric: (min: number, field: string) => string;
	};
	max: {
		string: (max: number, field: string) => string;
		select: (max: number, field: string) => string;
		numeric: (max: number, field: string) => string;
	};
	email: (field: string) => string;
	regex: {
		password: (field: string) => string;
		numeric: () => string;
		decimal: (number: number) => string;
		other: (field: string) => string;
	};
	global: {
		networkIssue: string;
	};
	between: {
		numeric: (field: string, min: any, max: any) => string;
	};
	url: string;
}

export const Message = (): MessageProps => ({
	required: {
		text: (field) => `${field} is required.`,
		select: (field) => `Please select ${field}.`,
	},
	min: {
		string: (min, field) => `${field} should contain minimum ${min} characters.`,
		select: (min, field) => `Please select minimum ${min} ${field}.`,
		numeric: (min, field) => `${field} should contain minimum ${min} digits.`,
	},
	max: {
		string: (max, field) => `${field} should contain maximum ${max} characters.`,
		select: (max, field) => `Please select maximum ${max} ${field}.`,
		numeric: (max, field) => `${field} should contain maximum ${max} digits.`,
	},
	email: (field) => `${field} Is Invalid email.`,
	regex: {
		password: (field) => `${field} should contain at least an uppercase letter a lowercase letter a number and a special character.`,
		numeric: () => `Please enter digits only.`,
		decimal: (number) => `Please enter digits or decimal digits upto ${number} decimal only.`,
		other: (field)=>`Please enter valid ${field}.`
	},
	global: {
		networkIssue: `Network Issue.`,
	},
	between: {
		numeric: (field, min, max) => `The ${field} must be between ${min} and ${max}.`,
	},
	url: `Invalid URL.`,
});

export default Message;

