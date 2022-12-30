import { InputNumber } from "antd";
import React from "react";
import { InputWrapper, SplitInputWrapperProps } from "../../functions";
import { NumberInputBoxProps } from "./interface";

const NumberInputBox: React.FC<NumberInputBoxProps> = (props) => {
	const { formProps, inputProps } = SplitInputWrapperProps(props);
	return (
		<InputWrapper {...formProps}>
			<InputNumber {...inputProps} />
		</InputWrapper>
	);
};

export default NumberInputBox;
