import { useProjectsControllerFindOne } from "@api/services/projects";
import TaskList from "@features/Tasks/TaskList";
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Divider,
	Paper,
	Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import UpdateProject from "./UpdateProject";
import DeleteProject from "./DeleteProject";
import CreateNewTask from "@features/Tasks/CreateNewTask";
import dayjs from "dayjs";
import { useAuthStore } from "@store/auth";
import { ProjectStatus } from "@shared/constants";

export default function ProjectDetails() {
	const { projectId } = useParams();
	const { session } = useAuthStore();
	const { data } = useProjectsControllerFindOne(projectId ?? "", {
		query: { enabled: !!projectId },
	});

	return (
		<>
			<Box>
				<Card variant="outlined" sx={{ maxWidth: "500px" }}>
					<CardHeader
						title={
							<Box
								component="span"
								display="flex"
								justifyContent="space-between"
							>
								<Box display="flex">
									<Typography variant="h6">{data?.name}</Typography>
									<Chip
										label={data?.status}
										sx={{ ml: 1 }}
										color={
											data?.status === ProjectStatus.OPEN
												? "primary"
												: data?.status === ProjectStatus.IN_PROGRESS
												? "warning"
												: "success"
										}
									/>
								</Box>
								<Box
									display="flex"
									gap={0.5}
									sx={{
										visibility:
											session?.user.role === "USER" ? "hidden" : "visible",
									}}
								>
									<UpdateProject projectId={projectId ?? ""} />
									<DeleteProject projectId={projectId ?? ""} />
								</Box>
							</Box>
						}
					/>
					<CardContent>
						{data?.description}
						<Divider sx={{ my: 2 }} />
						<Box display="flex" justifyContent="space-between">
							<Typography variant="body1" fontWeight="bold">
								Start Date
							</Typography>
							<Typography variant="body1">
								{dayjs(data?.startDate).utc().format("MM/DD/YYYY")}
							</Typography>
						</Box>
						<Box display="flex" justifyContent="space-between">
							<Typography variant="body1" fontWeight="bold">
								End Date
							</Typography>
							<Typography variant="body1">
								{dayjs(data?.endDate).utc().format("MM/DD/YYYY")}
							</Typography>
						</Box>
						<Divider sx={{ my: 2 }} />
						<Typography variant="body1" fontWeight="bold">
							Assigned Members ({data?.assignedUsers?.length})
						</Typography>
						<Box display="flex" flexWrap="wrap" gap={1}>
							{data?.assignedUsers?.length === 0 ? (
								<Typography variant="body1">No members assigned</Typography>
							) : (
								data?.assignedUsers?.map((member) => (
									<Chip
										key={member.userId}
										label={member.user?.firstName + " " + member.user?.lastName}
									/>
								))
							)}
						</Box>
					</CardContent>
				</Card>
			</Box>
			<Paper sx={{ p: 2, mt: 2 }}>
				<Box display="flex" justifyContent="space-between" mb={2}>
					<Typography variant="h6">Tasks</Typography>
					<CreateNewTask />
				</Box>
				<TaskList />
			</Paper>
		</>
	);
}
