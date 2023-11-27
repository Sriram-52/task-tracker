import { useTasksControllerFindAll } from "@api/services/tasks";
import { Box, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import DeleteTask from "./DeleteTask";
import UpdateTask from "./UpdateTask";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@store/auth";
import { TaskPriority, TaskStatus } from "@shared/constants";

export default function TaskList() {
	const { projectId } = useParams();
	const { session } = useAuthStore();
	const { data, isLoading } = useTasksControllerFindAll(
		{ projectId: projectId ?? "" },
		{ query: { enabled: !!projectId } }
	);

	const columns: GridColDef[] = [
		{ field: "name", headerName: "Name", flex: 1 },
		{ field: "description", headerName: "Description", flex: 1 },
		{
			field: "status",
			headerName: "Status",
			flex: 1,
			renderCell: (row) => (
				<Chip
					label={row.value}
					color={
						row.value === TaskStatus.OPEN
							? "primary"
							: row.value === TaskStatus.IN_PROGRESS
							? "warning"
							: "success"
					}
				/>
			),
		},
		{
			field: "priority",
			headerName: "Priority",
			flex: 1,
			renderCell: (row) => (
				<Chip
					label={row.value}
					color={
						row.value === TaskPriority.LOW
							? "secondary"
							: row.value === TaskPriority.MEDIUM
							? "info"
							: "error"
					}
				/>
			),
		},
		{
			field: "startDate",
			headerName: "Start Date",
			flex: 1,
			valueFormatter: ({ value }) => dayjs(value).utc().format("MM/DD/YYYY"),
		},
		{
			field: "endDate",
			headerName: "End Date",
			flex: 1,
			valueFormatter: ({ value }) => dayjs(value).utc().format("MM/DD/YYYY"),
		},
		{
			field: "dueDays",
			headerName: "Due Days",
			flex: 1,
			sortable: false,
			renderCell: (row) => {
				if (row.api.getRow(row.id).status === TaskStatus.DONE) {
					return null;
				}
				const dueDays = dayjs().diff(dayjs(row.row.endDate).utc(), "day");
				if (dueDays < 0) {
					return <Box color="green">{dueDays}</Box>;
				}
				return <Box color="red">{dueDays}</Box>;
			},
		},
		{
			field: "",
			headerName: "Actions",
			flex: 1,
			renderCell: (row) => (
				<>
					<UpdateTask taskId={row.id as string} />
					<DeleteTask taskId={row.id as string} />
				</>
			),
		},
	];

	return (
		<Box sx={{ flexGrow: 1 }}>
			<DataGrid
				rows={data ?? []}
				columns={
					session?.user.role === "USER"
						? columns.filter((column) => column.headerName !== "Actions")
						: columns
				}
				loading={isLoading}
				rowSelection={false}
			/>
		</Box>
	);
}
