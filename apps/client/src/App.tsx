import React from "react";
import { useAuthStore } from "@store/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import Loader from "@shared/components/Loader";

function AppContainer() {
	const { user } = useAuthStore();

	if (!user) {
		return (
			<Routes>
				{publicRoutes.map(({ path, Component }) => (
					<Route
						key={path}
						path={path}
						element={
							<React.Suspense fallback={<Loader />}>
								<Component />
							</React.Suspense>
						}
					/>
				))}
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		);
	}

	return (
		<Routes>
			{privateRoutes.map(({ path, Component }) => (
				<Route
					key={path}
					path={path}
					element={
						<React.Suspense fallback={<Loader />}>
							<Component />
						</React.Suspense>
					}
				/>
			))}
		</Routes>
	);
}

export default function App() {
	return <AppContainer />;
}
