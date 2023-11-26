import { CreateTaskDto, Project, Task } from "@api/services/models";
import {
	useTasksControllerCreate,
	useTasksControllerUpdate,
	getTasksControllerFindAllQueryKey,
} from "@api/services/tasks";
import { Dialog, DialogContent, Grid } from "@mui/material";
import AppDialogFooter from "@shared/components/Dialog/AppDialogFooter";
import AppDialogHeader from "@shared/components/Dialog/AppDialogHeader";
import { DateFormField } from "@shared/components/FormFields/DateFormField";
import { SelectFormField } from "@shared/components/FormFields/SelectFormField";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import Loader from "@shared/components/Loader";
import { TaskPriority, TaskStatus } from "@shared/constants";
import { useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { date, object, string } from "yup";

interface UpsertTaskDialogProps {
	taskDto?: Task;
	isLoading?: boolean;
	open: boolean;
	onClose: () => void;
	projectId: string;
	projectDto: Project;
}

const schema = object<CreateTaskDto>({
	name: string().required("Name is required"),
	description: string().required("Description is required"),
	status: string().required("Status is required"),
	priority: string().required("Priority is required"),
	startDate: date().required("Start Date is required"),
	endDate: date()
		.required("End Date is required")
		.test("end-date", "End Date must be after Start Date", function (value) {
			const startDate = this.parent.startDate;
			return startDate <= value;
		}),
});

export default function UpsertTaskDialog(
	props: Readonly<UpsertTaskDialogProps>
) {
	const { mutateAsync: createMutateAsync } = useTasksControllerCreate();
	const { mutateAsync: updateMutateAsync } = useTasksControllerUpdate();

	const initialValues: CreateTaskDto = {
		name: "",
		description: "",
		status: "",
		startDate: "",
		endDate: "",
		priority: "",
		...props.taskDto,
		projectId: props.projectId,
		assignedUsers:
			props.taskDto?.assignedUsers?.map((user) => user.userId) ?? [],
	};

	const queryClient = useQueryClient();
	const handleSubmit = async (
		data: CreateTaskDto,
		actions: FormikHelpers<CreateTaskDto>
	) => {
		try {
			actions.setSubmitting(true);
			if (props.taskDto) {
				await updateMutateAsync({ id: props.taskDto.id, data });
			} else {
				await createMutateAsync({ data });
			}
			await queryClient.invalidateQueries({
				queryKey: getTasksControllerFindAllQueryKey({
					projectId: props.projectId,
				}),
			});
			actions.setSubmitting(false);
			props.onClose();
		} catch (error) {
			actions.setSubmitting(false);
			console.log(error);
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
								title={props.taskDto ? "Edit Task" : "Create New Task"}
								onClose={props.onClose}
							/>
							<DialogContent>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<Field
											name="name"
											label="Name"
											component={TextFormField}
											required
										/>
									</Grid>
									<Grid item xs={12}>
										<Field
											name="description"
											label="Description"
											component={TextFormField}
											multiline
											minRows={4}
											maxRows={6}
											required
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<Field
											name="status"
											label="Status"
											component={SelectFormField}
											required
											options={[
												{ value: TaskStatus.OPEN, label: "Open" },
												{ value: TaskStatus.IN_PROGRESS, label: "In Progress" },
												{ value: TaskStatus.DONE, label: "Done" },
											]}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<Field
											name="priority"
											label="Priority"
											component={SelectFormField}
											required
											options={[
												{ value: TaskPriority.LOW, label: "Low" },
												{ value: TaskPriority.MEDIUM, label: "Medium" },
												{ value: TaskPriority.HIGH, label: "High" },
											]}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<Field
											name="startDate"
											label="Start Date"
											component={DateFormField}
											required
											minDate={props.projectDto.startDate}
											maxDate={props.projectDto.endDate}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<Field
											name="endDate"
											label="End Date"
											component={DateFormField}
											required
											minDate={
												values.startDate
													? values.startDate
													: props.projectDto.startDate
											}
											maxDate={props.projectDto.endDate}
										/>
									</Grid>
									<Grid item xs={12}>
										<Field
											name="assignedUsers"
											label="Assigned Users"
											component={SelectFormField}
											multiple
											options={
												props.projectDto.assignedUsers?.map((item) => ({
													value: item.userId,
													label:
														item.user?.firstName + " " + item.user?.lastName,
												})) ?? []
											}
										/>
									</Grid>
								</Grid>
							</DialogContent>
							<AppDialogFooter
								onClose={props.onClose}
								saveButtonText={props.taskDto ? "Update" : "Create"}
								saveButtonDisabled={!isValid || !dirty || isSubmitting}
							/>
						</Form>
					)}
				</Formik>
			)}
		</Dialog>
	);
}
