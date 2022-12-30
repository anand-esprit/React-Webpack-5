import React from "react";
import { DatePicker } from "antd";
import { DateRangePickerInputBoxProps } from "./interface";
import { SplitInputWrapperProps, InputWrapper } from "../../functions";

const DateRangePickerInputBox: React.FC<DateRangePickerInputBoxProps> = (
	props
) => {
	const { formProps, inputProps } = SplitInputWrapperProps(props);
	return (
		<InputWrapper {...formProps}>
			<DatePicker.RangePicker {...inputProps} />
		</InputWrapper>
	);
};

export default DateRangePickerInputBox;
