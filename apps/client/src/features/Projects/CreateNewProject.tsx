import { Button } from "@mui/material";
import { useDialog } from "@shared/hooks/useDialog";
import UpsertProjectDialog from "./UpsertProjectDialog";
import { useAuthStore } from "@store/auth";

export default function CreateNewProject() {
	const { open, handleClickOpen, handleClose } = useDialog();
	const { session } = useAuthStore();

	return (
		<>
			<Button
				variant="contained"
				onClick={handleClickOpen}
				sx={{
					visibility: session?.user.role === "USER" ? "hidden" : "visible",
				}}
			>
				Create New Project
			</Button>
			<UpsertProjectDialog open={open} onClose={handleClose} />
		</>
	);
}
