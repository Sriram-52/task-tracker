import * as React from "react";
import { Route } from "@shared/models";

export const publicRoutes: Route[] = [
	{ path: "/login", Component: React.lazy(() => import("@pages/LoginPage")) },
	{
		path: "/register",
		Component: React.lazy(() => import("@pages/RegisterPage")),
	},
];

export const privateRoutes: Route[] = [
	{ path: "/", Component: React.lazy(() => import("@pages/HomePage")) },
];
