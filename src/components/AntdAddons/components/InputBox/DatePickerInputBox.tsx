import React from "react";
import { DatePicker } from "antd";
import { DatePickerInputBoxProps } from "./interface";
import { SplitInputWrapperProps, InputWrapper } from "../../functions";

const DatePickerInputBox: React.FC<DatePickerInputBoxProps> = (props) => {
	const { formProps, inputProps } = SplitInputWrapperProps(props);
	return (
		<InputWrapper {...formProps}>
			<DatePicker {...inputProps} />
		</InputWrapper>
	);
};

export default DatePickerInputBox;
