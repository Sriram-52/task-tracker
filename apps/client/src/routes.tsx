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
	{
		path: "/",
		roles: ["ADMIN", "MANAGER", "USER"],
		Component: React.lazy(() => import("@pages/ProjectListPage")),
	},
	{
		path: "/projects/:projectId",
		roles: ["ADMIN", "MANAGER", "USER"],
		Component: React.lazy(() => import("@pages/ProjectDetailPage")),
	},
	{
		path: "/users",
		roles: ["ADMIN"],
		Component: React.lazy(() => import("@pages/UserListPage")),
	},
];
