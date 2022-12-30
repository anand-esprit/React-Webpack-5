import React from "react";
import { Input } from "antd";
import { SplitInputWrapperProps, InputWrapper } from "../../functions";
import { TextAreaBoxProps } from "./interface";
const { TextArea } = Input;

const TextAreaInputBox: React.FC<TextAreaBoxProps> = ({
	rows = 4,
	...rest
}) => {
	const { formProps, inputProps } = SplitInputWrapperProps(rest);

	return (
		<InputWrapper {...formProps}>
			<TextArea {...inputProps} rows={rows}/>
		</InputWrapper>
	);
};

export default TextAreaInputBox;
