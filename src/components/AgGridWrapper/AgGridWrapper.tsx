import React from "react";
import { AgGridReact, AgGridReactProps, AgReactUiProps } from "ag-grid-react";
import Config from "../../config/Config";
import "ag-grid-enterprise";

interface AgGridWrapperProps extends AgReactUiProps, AgGridReactProps {
	type?: "serverSide" | "clientSide";
}

const AgGridWrapper: React.FC<AgGridWrapperProps> = ({
	children,
	type = "clientSide",
	...rest
}) => {
	const gridType =
		type === "serverSide" ? Config.grid.server : Config.grid.local;

	return (
		<div className="ag-theme-alpine ag-grid-wrapper">
			<AgGridReact {...gridType} {...rest}>
				{children}
			</AgGridReact>
		</div>
	);
};

export default AgGridWrapper;
