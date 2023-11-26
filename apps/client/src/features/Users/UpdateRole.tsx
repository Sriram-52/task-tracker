import {
	getUsersControllerFindAllQueryKey,
	useUsersControllerFindOne,
	useUsersControllerUpdate,
} from "@api/services/users";
import { useDialog } from "@shared/hooks/useDialog";
import EditIcon from "@mui/icons-material/Edit";
import { Dialog, DialogContent, IconButton, Tooltip } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import AppDialogHeader from "@shared/components/Dialog/AppDialogHeader";
import { SelectFormField } from "@shared/components/FormFields/SelectFormField";
import { UserDtoRole } from "@api/services/models";
import AppDialogFooter from "@shared/components/Dialog/AppDialogFooter";
import { useAuthStore } from "@store/auth";
import { useQueryClient } from "@tanstack/react-query";

export default function UpdateRole({ userId }: Readonly<{ userId: string }>) {
	const { open, handleClickOpen, handleClose } = useDialog();
	const { session } = useAuthStore();

	const { data: user } = useUsersControllerFindOne(userId, {
		query: { enabled: open },
	});
	const { mutateAsync } = useUsersControllerUpdate();

	const queryClient = useQueryClient();

	const handleSubmit = async (
		values: { role: UserDtoRole },
		actions: FormikHelpers<{ role: UserDtoRole }>
	) => {
		try {
			actions.setSubmitting(true);
			await mutateAsync({ id: userId, data: values });
			await queryClient.invalidateQueries({
				queryKey: getUsersControllerFindAllQueryKey(),
			});
		} catch (error) {
			console.error(error);
		} finally {
			actions.setSubmitting(false);
			handleClose();
		}
	};

	return (
		<>
			<Tooltip
				title="Modify role"
				sx={{ visibility: session?.user.id === userId ? "hidden" : "visible" }}
			>
				<IconButton onClick={handleClickOpen}>
					<EditIcon color="secondary" />
				</IconButton>
			</Tooltip>
			<Dialog open={open} onClose={handleClose} maxWidth="sm">
				<Formik
					initialValues={{ role: user?.role ?? UserDtoRole.USER }}
					onSubmit={handleSubmit}
					enableReinitialize
				>
					{() => (
						<Form>
							<AppDialogHeader title="Modify role" onClose={handleClose} />
							<DialogContent>
								<Field
									name="role"
									label="Role"
									component={SelectFormField}
									fullWidth
									options={[
										{ label: "Manager", value: UserDtoRole.MANAGER },
										{ label: "User", value: UserDtoRole.USER },
									]}
								/>
							</DialogContent>
							<AppDialogFooter onClose={handleClose} />
						</Form>
					)}
				</Formik>
			</Dialog>
		</>
	);
}
