import { useProjectsControllerRemove } from "@api/services/projects";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip, Typography } from "@mui/material";
import ConfirmDialog from "@shared/components/Dialog/ConfirmDialog";
import { useDialog } from "@shared/hooks/useDialog";
import { useNavigate } from "react-router-dom";

export default function DeleteProject({
	projectId,
}: Readonly<{ projectId: string }>) {
	const { open, handleClickOpen, handleClose } = useDialog();
	const navigate = useNavigate();

	const { mutateAsync } = useProjectsControllerRemove({
		mutation: {
			onSuccess() {
				handleClose();
				navigate("/");
			},
		},
	});

	return (
		<>
			<Tooltip title="Delete Project">
				<IconButton onClick={handleClickOpen}>
					<DeleteIcon color="error" />
				</IconButton>
			</Tooltip>
			<ConfirmDialog
				title="Are you sure you want to delete this project?"
				message={
					<Typography variant="body1">
						This will delete all the data associated with this project. This
						action cannot be undone.
					</Typography>
				}
				open={open}
				onClose={handleClose}
				onConfirm={() => mutateAsync({ id: projectId })}
			/>
		</>
	);
}
