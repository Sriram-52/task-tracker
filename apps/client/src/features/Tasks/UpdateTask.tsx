import { useTasksControllerFindOne } from "@api/services/tasks";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import { useDialog } from "@shared/hooks/useDialog";
import UpsertTaskDialog from "./UpsertTaskDialog";
import { useParams } from "react-router-dom";
import { useProjectsControllerFindOne } from "@api/services/projects";

export default function UpdateTask({ taskId }: Readonly<{ taskId: string }>) {
	const { open, handleClickOpen, handleClose } = useDialog();
	const { projectId } = useParams();
	const { data: projectDto } = useProjectsControllerFindOne(projectId ?? "", {
		query: { enabled: !!projectId },
	});
	const { data } = useTasksControllerFindOne(taskId, {
		query: { enabled: open && !!taskId },
	});

	if (!projectDto) return null;

	return (
		<>
			<Tooltip title="Edit Task">
				<IconButton onClick={handleClickOpen}>
					<EditIcon color="primary" />
				</IconButton>
			</Tooltip>
			<UpsertTaskDialog
				open={open}
				onClose={handleClose}
				taskDto={data}
				isLoading={!data}
				projectId={projectDto.id}
				projectDto={projectDto}
			/>
		</>
	);
}
