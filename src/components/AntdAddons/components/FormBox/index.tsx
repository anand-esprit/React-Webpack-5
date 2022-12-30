import React from "react";
import { FormProps, Form } from "antd";

const FormBox: React.FC<FormProps> = ({
	layout = "vertical",
	autoComplete = "off",
	requiredMark = "optional",
	scrollToFirstError = { behavior: "smooth" },
	// children,
	...rest
}) => {
	return (
		<Form
			layout={layout}
			autoComplete={autoComplete}
			requiredMark={requiredMark}
			scrollToFirstError={scrollToFirstError}
			{...rest}
		>
			{/* {children} */}
		</Form>
	);
};

export default FormBox;
