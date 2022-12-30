import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./assets/styles/main.less";
import App from "./App";
import PageSpinner from "./components/PageSpinner/PageSpinner";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<Suspense fallback={<PageSpinner />}>
		<App />
	</Suspense>
);
