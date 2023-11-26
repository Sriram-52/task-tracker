import { AlertProps } from "@mui/material";
import { createStore } from "zustand/vanilla";

interface AlertStore {
	open: boolean;
	message: string;
	severity: AlertProps["severity"];
	setAlert: (open: boolean, message: string, severity: AlertProps["severity"]) => void;
}

export const useAlertStore = createStore<AlertStore>((set) => ({
	open: false,
	message: "",
	severity: "success",
	setAlert: (open, message, severity) => set({ open, message, severity }),
}));
