import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { TextFormField } from "@shared/components/FormFields/TextFormField";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { RegisterDto } from "@api/services/models";
import { object, string } from "yup";
import Copyright from "./Copyright";
import { useAuthControllerRegister } from "@api/services/auth";
import { useNavigate } from "react-router-dom";

const schema = object<RegisterDto>({
	email: string().email().required("Email is required"),
	password: string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
	firstName: string().required("First name is required"),
	lastName: string().required("Last name is required"),
});

export default function RegisterForm() {
	const { mutateAsync } = useAuthControllerRegister();
	const navigate = useNavigate();

	const handleSubmit = async (
		values: RegisterDto,
		actions: FormikHelpers<RegisterDto>
	) => {
		actions.setSubmitting(true);
		await mutateAsync({ data: values });
		navigate("/login");
		actions.setSubmitting(false);
	};

	const initialValues: RegisterDto = {
		email: "",
		password: "",
		firstName: "",
		lastName: "",
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
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box sx={{ mt: 3 }}>
						<Formik
							initialValues={initialValues}
							onSubmit={handleSubmit}
							validationSchema={schema}
						>
							{({ isValid, dirty, isSubmitting }) => (
								<Form>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={6}>
											<Field
												name="firstName"
												type="text"
												placeholder="First Name"
												label="First Name"
												required
												component={TextFormField}
												autoFocus
												autoComplete="given-name"
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<Field
												name="lastName"
												type="text"
												placeholder="Last Name"
												label="Last Name"
												required
												component={TextFormField}
												autoComplete="family-name"
											/>
										</Grid>
										<Grid item xs={12}>
											<Field
												name="email"
												type="email"
												placeholder="Email"
												label="Email Address"
												required
												component={TextFormField}
												autoComplete="email"
											/>
										</Grid>
										<Grid item xs={12}>
											<Field
												name="password"
												type="password"
												placeholder="Password"
												label="Password"
												required
												component={TextFormField}
												autoComplete="new-password"
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
											<Link href="/login" variant="body2">
												Already have an account? Sign in
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
