import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import AppDialogHeader from "./AppDialogHeader";

interface ConfirmDialogProps {
	open: boolean;
	onClose: () => void;
	title: string;
	message: React.ReactNode;
	onConfirm: () => void;
}

export default function ConfirmDialog(props: Readonly<ConfirmDialogProps>) {
	return (
		<Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="sm">
			<AppDialogHeader title={props.title} onClose={props.onClose} />
			<DialogContent>{props.message}</DialogContent>
			<DialogActions>
				<Button color="secondary" onClick={props.onClose}>
					Cancel
				</Button>
				<Button variant="contained" onClick={props.onConfirm}>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
}
