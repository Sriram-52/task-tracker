import { useProjectsControllerFindOne } from "@api/services/projects";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import { useDialog } from "@shared/hooks/useDialog";
import UpsertProjectDialog from "./UpsertProjectDialog";

export default function UpdateProject({
	projectId,
}: Readonly<{ projectId: string }>) {
	const { open, handleClickOpen, handleClose } = useDialog();

	const { data } = useProjectsControllerFindOne(projectId, {
		query: { enabled: open && !!projectId },
	});

	return (
		<>
			<Tooltip title="Edit Project">
				<IconButton onClick={handleClickOpen}>
					<EditIcon color="primary" />
				</IconButton>
			</Tooltip>
			<UpsertProjectDialog
				open={open}
				onClose={handleClose}
				projectDto={data}
				isLoading={!data}
			/>
		</>
	);
}
