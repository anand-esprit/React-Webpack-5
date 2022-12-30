import React from "react";
import { Select } from "antd";
import {
	defaultOptionKeys,
	defaultSeparator,
	InputWrapper,
	SplitInputWrapperProps,
} from "../../functions";
import { SelectInputBoxProps } from "./interface";

const SelectInputBox: React.FC<SelectInputBoxProps> = (props) => {
	const { formProps, inputProps } = SplitInputWrapperProps(props);
	const { options, ...rest } = inputProps;

	const valueKey = options?.valueKey || defaultOptionKeys.value;
	const textKey = options?.textKey || defaultOptionKeys.text;
	const separator = options?.separator || defaultSeparator;
	let textKeys: any[] = [];
	if (Array.isArray(options?.textKey)) {
		textKeys = options?.textKey;
	}

	const renderOptions = options?.list?.map((option: any) => {
		if (
			options?.rejectedValues &&
			options?.rejectedValues.includes(option[valueKey]) &&
			!options?.requiredValues.includes(option[valueKey])
		) {
			return null;
		}

		return (
			<Select.Option key={option[valueKey]} value={option[valueKey]}>
				{textKeys.length <= 0
					? option[textKey]
					: textKeys
							.map((text_key) => option[text_key] || text_key)
							.join(separator)}
			</Select.Option>
		);
	});

	return (
		<InputWrapper {...formProps}>
			<Select {...rest}>{renderOptions}</Select>
		</InputWrapper>
	);
};

export default SelectInputBox;
