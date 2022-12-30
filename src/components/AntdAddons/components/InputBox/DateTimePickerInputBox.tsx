import React from "react";
import { DatePicker } from "antd";
import { DatePickerInputBoxProps } from "./interface";
import { SplitInputWrapperProps, InputWrapper } from "../../functions";

const DateTimePickerInputBox: React.FC<DatePickerInputBoxProps> = (props) => {
	const { formProps, inputProps } = SplitInputWrapperProps(props);
	return (
		<InputWrapper {...formProps}>
			<DatePicker format="YYYY-MM-DD HH:mm" showTime {...inputProps} />
		</InputWrapper>
	);
};

export default DateTimePickerInputBox;
