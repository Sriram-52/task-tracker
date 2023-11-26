import { useProjectsControllerFindAll } from "@api/services/projects";
import { Box, Chip, Link, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import CreateNewProject from "./CreateNewProject";
import { ProjectStatus } from "@shared/constants";

export default function ProjectList() {
	const { data, isLoading } = useProjectsControllerFindAll();

	const columns: GridColDef[] = [
		{
			field: "name",
			headerName: "Name",
			flex: 1,
			renderCell: (row) => (
				<Link href={`/projects/${row.id}`}>{row.value}</Link>
			),
		},
		{ field: "description", headerName: "Description", flex: 1 },
		{
			field: "status",
			headerName: "Status",
			flex: 1,
			renderCell: (row) => (
				<Chip
					label={row.value}
					color={
						row.value === ProjectStatus.OPEN
							? "primary"
							: row.value === ProjectStatus.IN_PROGRESS
							? "warning"
							: "success"
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
	];

	return (
		<Paper sx={{ p: 2 }}>
			<Box display="flex" justifyContent="space-between" mb={2}>
				<Typography variant="h6">Projects</Typography>
				<CreateNewProject />
			</Box>
			<Box sx={{ flexGrow: 1 }}>
				<DataGrid
					rows={data ?? []}
					columns={columns}
					loading={isLoading}
					rowSelection={false}
				/>
			</Box>
		</Paper>
	);
}
