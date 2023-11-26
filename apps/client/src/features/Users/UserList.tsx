import { useUsersControllerFindAll } from "@api/services/users";
import { Box, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import UpdateRole from "./UpdateRole";

export default function UserList() {
	const { data, isLoading } = useUsersControllerFindAll();

	const columns: GridColDef[] = [
		{ field: "firstName", headerName: "First Name", flex: 1 },
		{ field: "lastName", headerName: "Last Name", flex: 1 },
		{ field: "email", headerName: "Email", flex: 1 },
		{
			field: "role",
			headerName: "Role",
			flex: 1,
			valueFormatter: ({ value }) => value?.toLowerCase(),
		},
		{
			field: "createdAt",
			headerName: "Joined At",
			flex: 1,
			valueFormatter: ({ value }) => dayjs(value).format("MM/DD/YYYY, hh:mm A"),
		},
		{
			field: "",
			headerName: "Actions",
			flex: 1,
			renderCell: (row) => <UpdateRole userId={row.id as string} />,
		},
	];

	return (
		<Paper sx={{ p: 2 }}>
			<Box display="flex" mb={2}>
				<Typography variant="h6">Users</Typography>
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
