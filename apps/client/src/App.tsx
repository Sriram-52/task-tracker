import React, { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@store/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import Loader from "@shared/components/Loader";
import {
	Snackbar,
	Alert,
	Typography,
	Backdrop,
	CircularProgress,
} from "@mui/material";
import { useAlertStore } from "@store/alert";
import { useLoaderStore } from "@store/loader";
import { useEffectOnce } from "@shared/hooks/useEffectOnce";
import LoggedInLayout from "./layout/LoggedInLayout";
import UnAuthorizedPage from "@pages/UnAuthorizedPage";
import NotFoundPage from "@pages/NotFoundPage";

function AppContainer() {
	const { session, signInWithToken, isLoading } = useAuthStore();

	useEffectOnce(() => {
		signInWithToken();
	});

	if (isLoading) {
		return <Loader />;
	}

	if (session === null) {
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
				<Route path="/" element={<Navigate to="/login" />} />
			</Routes>
		);
	}

	return (
		<LoggedInLayout>
			<Routes>
				<Route path="*" element={<NotFoundPage />} />
				{privateRoutes.map(({ path, Component, roles }) => (
					<Route
						key={path}
						path={path}
						element={
							<React.Suspense fallback={<Loader />}>
								{roles?.includes(session.user.role) ? (
									<Component />
								) : (
									<UnAuthorizedPage />
								)}
							</React.Suspense>
						}
					/>
				))}
				<Route path="/login" element={<Navigate to="/" />} />
			</Routes>
		</LoggedInLayout>
	);
}

export default function App() {
	const [open, setOpen] = useState(false);
	const [backdropOpen, setBackdropOpen] = useState(false);

	const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const alertRef = useRef(useAlertStore.getState());
	const loaderRef = useRef(useLoaderStore.getState());

	useEffect(() => {
		const unsubscribeAlert = useAlertStore.subscribe((state) => {
			alertRef.current = state;
			setOpen(state.open);
		});
		const unsubscribeLoading = useLoaderStore.subscribe((state) => {
			loaderRef.current = state;
			setBackdropOpen(state.open);
		});

		return () => {
			unsubscribeAlert();
			unsubscribeLoading();
		};
	}, []);

	return (
		<>
			<AppContainer />
			<Snackbar
				open={open}
				autoHideDuration={3000}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				onClose={handleClose}
			>
				<Alert
					severity={alertRef.current.severity}
					sx={{ width: "100%" }}
					onClose={handleClose}
				>
					<Typography>{alertRef.current.message}</Typography>
				</Alert>
			</Snackbar>
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme) =>
						Math.max.apply(Math, Object.values(theme.zIndex)) + 1,
				}}
				open={backdropOpen}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</>
	);
}
