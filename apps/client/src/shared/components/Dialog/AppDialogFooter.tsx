import React from "react";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function AppDialogFooter({
	onClose,
	cancelButtonText = "Cancel",
	saveButtonText = "Save",
	saveButtonDisabled = false,
	cancelButtonDisabled = false,
	children,
}: {
	onClose: () => void;
	cancelButtonText?: string;
	saveButtonText?: string;
	saveButtonDisabled?: boolean;
	cancelButtonDisabled?: boolean;
	children?: React.ReactNode;
}) {
	return (
		<DialogActions
			sx={{
				display: "flex",
				justifyContent: "center",
				m: 0,
				p: 2,
			}}
		>
			{children}
			<Button
				variant="outlined"
				disabled={cancelButtonDisabled}
				color="secondary"
				onClick={onClose}
			>
				{cancelButtonText}
			</Button>
			<Button
				variant="contained"
				disabled={saveButtonDisabled}
				color="primary"
				type="submit"
			>
				{saveButtonText}
			</Button>
		</DialogActions>
	);
}
