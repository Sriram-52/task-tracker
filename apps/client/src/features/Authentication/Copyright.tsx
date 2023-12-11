import { Typography, Link } from "@mui/material";

export default function Copyright() { //Copyright function for displaying Copyright logo
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			sx={{ mt: 8, mb: 4 }}
		>
			{"Copyright © "}
			<Link color="inherit" href="/">
				Task Tracker
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}
