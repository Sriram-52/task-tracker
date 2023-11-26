import { Box, Card, CardContent, Container, Typography } from "@mui/material";

export default function NotFoundPage() {
	return (
		<Container maxWidth="lg">
			<Card sx={{ p: 2 }}>
				<CardContent>
					<Box display="flex" justifyContent="center">
						<img
							src="https://i.imgur.com/qIufhof.png"
							alt="404"
							width={250}
							height={250}
						/>
					</Box>
					<Typography variant="h4" align="center">
						The page you are looking for does not exist.
					</Typography>
				</CardContent>
			</Card>
		</Container>
	);
}
