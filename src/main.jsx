import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "#/App";
import Form from "#/Form";
import Result from "#/Result";
import store from "#/store";

const router = createBrowserRouter([
	{
		path: "/",
		Component: App,
		children: [
			{
				index: true,
				Component: Form,
			},
			{
				path: "result",
				Component: Result,
			},
		],
	},
]);

const root = createRoot(document.querySelector("body"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
);
