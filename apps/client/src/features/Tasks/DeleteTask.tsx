import { useTasksControllerRemove } from "@api/services/tasks";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip, Typography } from "@mui/material";
import ConfirmDialog from "@shared/components/Dialog/ConfirmDialog";
import { useDialog } from "@shared/hooks/useDialog";

export default function DeleteTask({ taskId }: Readonly<{ taskId: string }>) {
	const { open, handleClickOpen, handleClose } = useDialog();

	const { mutateAsync } = useTasksControllerRemove({
		mutation: {
			onSuccess() {
				handleClose();
			},
		},
	});

	return (
		<>
			<Tooltip title="Delete Task">
				<IconButton onClick={handleClickOpen}>
					<DeleteIcon color="error" />
				</IconButton>
			</Tooltip>
			<ConfirmDialog
				title="Are you sure you want to delete this task?"
				message={
					<Typography variant="body1">
						This will delete all the data associated with this task. This action
						cannot be undone.
					</Typography>
				}
				open={open}
				onClose={handleClose}
				onConfirm={() => mutateAsync({ id: taskId })}
			/>
		</>
	);
}
