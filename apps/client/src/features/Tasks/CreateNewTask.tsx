import { Button } from "@mui/material";
import { useDialog } from "@shared/hooks/useDialog";
import UpsertTaskDialog from "./UpsertTaskDialog";
import { useParams } from "react-router-dom";
import { useProjectsControllerFindOne } from "@api/services/projects";
import { useAuthStore } from "@store/auth";

export default function CreateNewTask() {
	const { open, handleClickOpen, handleClose } = useDialog();
	const { projectId } = useParams();
	const { session } = useAuthStore();
	const { data } = useProjectsControllerFindOne(projectId ?? "", {
		query: { enabled: !!projectId },
	});

	if (!data) return null;

	return (
		<>
			<Button
				variant="contained"
				onClick={handleClickOpen}
				sx={{
					visibility: session?.user.role === "USER" ? "hidden" : "visible",
				}}
			>
				Create New Task
			</Button>
			<UpsertTaskDialog
				open={open}
				onClose={handleClose}
				projectId={data.id}
				projectDto={data}
			/>
		</>
	);
}
