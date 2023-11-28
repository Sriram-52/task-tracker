import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { object, string } from "yup";
import { LoginDto } from "@api/services/models";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { Grid } from "@mui/material";
import Copyright from "./Copyright";
import { useAuthStore } from "@store/auth";

const schema = object<LoginDto>({
	email: string().email().required("Email is required"),
	password: string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
});

export default function LoginForm() {
	const { signIn } = useAuthStore();

	const handleSubmit = async (
		values: LoginDto,
		actions: FormikHelpers<LoginDto>
	) => {
		actions.setSubmitting(true);
		await signIn(values.email, values.password);
		actions.setSubmitting(false);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
			}}
		>
			<Card
				sx={{
					maxWidth: "500px",
					padding: 2,
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Box component="img" src="/logo.svg" sx={{ width: 100 }} mb={1} />
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box sx={{ mt: 3 }}>
						<Formik
							initialValues={{ email: "", password: "" }}
							onSubmit={handleSubmit}
							validationSchema={schema}
						>
							{({ isValid, dirty, isSubmitting }) => (
								<Form>
									<Grid container spacing={2}>
										<Grid item xs={12}>
											<Field
												name="email"
												type="email"
												placeholder="Email"
												autoComplete="email"
												autoFocus
												label="Email Address"
												required={true}
												component={TextFormField}
											/>
										</Grid>
										<Grid item xs={12}>
											<Field
												name="password"
												type="password"
												placeholder="Password"
												autoComplete="current-password"
												label="Password"
												required
												component={TextFormField}
											/>
										</Grid>
									</Grid>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										sx={{ mt: 3, mb: 2 }}
										disabled={!isValid || !dirty || isSubmitting}
									>
										Sign In
									</Button>
									<Grid container justifyContent="flex-end">
										<Grid item>
											<Link href="/register" variant="body2">
												{"Don't have an account? Sign Up"}
											</Link>
										</Grid>
									</Grid>
								</Form>
							)}
						</Formik>
					</Box>
				</Box>
				<Copyright />
			</Card>
		</Box>
	);
}
