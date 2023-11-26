import React, { useState } from "react";
import { FieldProps, getIn } from "formik";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";

export const TextFormField: React.FC<
	FieldProps & {
		type?: string;
	}
> = ({ field, form, type, ...props }) => {
	const errorText =
		getIn(form.touched, field.name) && getIn(form.errors, field.name);
	const [hidePassword, setHidePassword] = useState(true);
	const handleClickHidePassword = () => setHidePassword((hide) => !hide);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	return (
		<Box mt={0.4}>
			<TextField
				{...field}
				fullWidth
				id={field.name}
				error={!!errorText}
				InputProps={{
					endAdornment: type === "password" && (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickHidePassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{hidePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
							</IconButton>
						</InputAdornment>
					),
				}}
				type={
					type === "password" && hidePassword
						? "password"
						: type === "password" && !hidePassword
						? "text"
						: type
				}
				helperText={errorText}
				{...props}
			/>
		</Box>
	);
};
