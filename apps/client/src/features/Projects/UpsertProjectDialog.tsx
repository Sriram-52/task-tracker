import { CreateProjectDto, Project } from "@api/services/models";
import {
	getProjectsControllerFindAllQueryKey,
	getProjectsControllerFindOneQueryKey,
	useProjectsControllerCreate,
	useProjectsControllerUpdate,
} from "@api/services/projects";
import { useUsersControllerFindAll } from "@api/services/users";
import { Dialog, DialogContent, Grid } from "@mui/material";
import AppDialogFooter from "@shared/components/Dialog/AppDialogFooter";
import AppDialogHeader from "@shared/components/Dialog/AppDialogHeader";
import { DateFormField } from "@shared/components/FormFields/DateFormField";
import { SelectFormField } from "@shared/components/FormFields/SelectFormField";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import Loader from "@shared/components/Loader";
import { ProjectStatus } from "@shared/constants";
import { useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { date, object, string } from "yup";

interface UpsertProjectDialogProps {
	projectDto?: Project;
	isLoading?: boolean;
	open: boolean;
	onClose: () => void;
}

const schema = object<CreateProjectDto>({
	name: string().required("Name is required"),
	description: string().required("Description is required"),
	status: string().required("Status is required"),
	startDate: date().required("Start Date is required"),
	endDate: date()
		.required("End Date is required")
		.test("end-date", "End Date must be after Start Date", function (value) {
			const startDate = this.parent.startDate;
			return startDate <= value;
		}),
});

export default function UpsertProjectDialog(
	props: Readonly<UpsertProjectDialogProps>
) {
	const { mutateAsync: createMutateAsync } = useProjectsControllerCreate();
	const { mutateAsync: updateMutateAsync } = useProjectsControllerUpdate();

	const { data: users } = useUsersControllerFindAll({
		query: { enabled: props.open },
	});

	const initialValues: CreateProjectDto = {
		name: "",
		description: "",
		status: "",
		startDate: "",
		endDate: "",
		...props.projectDto,
		assignedUsers:
			props.projectDto?.assignedUsers?.map((user) => user.userId) ?? [],
	};

	const queryClient = useQueryClient();
	const handleSubmit = async (
		data: CreateProjectDto,
		actions: FormikHelpers<CreateProjectDto>
	) => {
		try {
			actions.setSubmitting(true);
			if (props.projectDto) {
				await updateMutateAsync({ id: props.projectDto.id, data });
				await queryClient.invalidateQueries({
					queryKey: getProjectsControllerFindOneQueryKey(props.projectDto?.id),
				});
			} else {
				await createMutateAsync({ data });
				await queryClient.invalidateQueries({
					queryKey: getProjectsControllerFindAllQueryKey(),
				});
			}
			actions.setSubmitting(false);
			props.onClose();
		} catch (error) {
			actions.setSubmitting(false);
			console.error(error);
		}
	};

	return (
		<Dialog open={props.open} onClose={props.onClose}>
			{props.isLoading ? (
				<Loader />
			) : (
				<Formik
					initialValues={initialValues}
					validationSchema={schema}
					onSubmit={handleSubmit}
					enableReinitialize
				>
					{({ isValid, dirty, isSubmitting, values }) => (
						<Form>
							<AppDialogHeader
								title={props.projectDto ? "Edit Project" : "Create New Project"}
								onClose={props.onClose}
							/>
							<DialogContent>
								<Grid container spacing={2}>
									<Grid item xs={12} md={12}>
										<Field
											name="name"
											label="Name"
											component={TextFormField}
											required
										/>
									</Grid>
									<Grid item xs={12} md={12}>
										<Field
											name="description"
											label="Description"
											multiline
											minRows={5}
											maxRows={10}
											component={TextFormField}
											required
										/>
									</Grid>
									<Grid item xs={12}>
										<Field
											name="status"
											label="Status"
											component={SelectFormField}
											required
											options={[
												{ value: ProjectStatus.OPEN, label: "Open" },
												{
													value: ProjectStatus.IN_PROGRESS,
													label: "In Progress",
												},
												{ value: ProjectStatus.DONE, label: "Done" },
											]}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<Field
											name="startDate"
											label="Start Date"
											component={DateFormField}
											required
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<Field
											name="endDate"
											label="End Date"
											component={DateFormField}
											required
											minDate={values.startDate}
										/>
									</Grid>
									<Grid item xs={12}>
										<Field
											name="assignedUsers"
											label="Assigned Users"
											component={SelectFormField}
											multiple
											options={
												users?.map((user) => ({
													value: user.id,
													label: user.firstName + " " + user.lastName,
												})) ?? []
											}
										/>
									</Grid>
								</Grid>
							</DialogContent>
							<AppDialogFooter
								onClose={props.onClose}
								saveButtonText={props.projectDto ? "Update" : "Create"}
								saveButtonDisabled={!isValid || !dirty || isSubmitting}
							/>
						</Form>
					)}
				</Formik>
			)}
		</Dialog>
	);
}
