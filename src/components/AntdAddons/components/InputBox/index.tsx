import React from "react";
import { FormItemProps } from "antd";
import TextInputBox from "./TextInputBox";
import PasswordInputBox from "./PasswordInputBox";
import SelectInputBox from "./SelectInputBox";
import { InputBoxProps } from "./interface";
import DatePickerInputBox from "./DatePickerInputBox";
import DateRangePickerInputBox from "./DateRangePickerInputBox";
import RadioInputBox from "./RadioInputBox";
import NumberInputBox from "./NumberInputBox";
import CheckboxInputBox from "./CheckboxInputBox";
import TextAreaInputBox from "./TextAreaInputBox";
import DateTimePickerInputBox from "./DateTimePickerInputBox";

const InternalInputBox: React.FC<InputBoxProps> = (props) => {
	return <TextInputBox {...props} />;
};

interface CompoundedComponent
	extends React.ForwardRefExoticComponent<FormItemProps> {
	Text: typeof TextInputBox;
	TextArea: typeof TextAreaInputBox;
	Password: typeof PasswordInputBox;
	Select: typeof SelectInputBox;
	DatePicker: typeof DatePickerInputBox;
	DateTimePicker: typeof DateTimePickerInputBox;
	DateRangePicker: typeof DateRangePickerInputBox;
	Radio: typeof RadioInputBox;
	Number: typeof NumberInputBox;
	Checkbox: typeof CheckboxInputBox;
}

const InputBox = InternalInputBox as CompoundedComponent;
InputBox.Text = TextInputBox;
InputBox.TextArea = TextAreaInputBox;
InputBox.Password = PasswordInputBox;
InputBox.Select = SelectInputBox;
InputBox.DatePicker = DatePickerInputBox;
InputBox.DateTimePicker = DateTimePickerInputBox;
InputBox.DateRangePicker = DateRangePickerInputBox;
InputBox.Radio = RadioInputBox;
InputBox.Number = NumberInputBox;
InputBox.Checkbox = CheckboxInputBox;

export default InputBox;
