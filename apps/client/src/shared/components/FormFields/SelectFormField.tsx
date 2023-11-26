import React from "react";
import { FieldProps, getIn } from "formik";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

export interface ListDto {
	value: string;
	label: string;
}

export const SelectFormField: React.FC<
	FieldProps & {
		label: string;
		required?: boolean;
		options: ListDto[];
		onValueChange?: (value: ListDto | ListDto[] | null) => void;
		multiple?: boolean;
	}
> = ({ field, form, label, options, onValueChange, ...props }) => {
	const errorText =
		getIn(form.touched, field.name) && getIn(form.errors, field.name);

	return (
		<Box mt={0.4}>
			<Autocomplete
				{...props}
				filterSelectedOptions
				id={field.name}
				options={options}
				onChange={(_, value) => {
					if (Array.isArray(value)) {
						form.setFieldValue(
							field.name,
							value.map((v) => v.value)
						);
						onValueChange?.(value);
					} else {
						form.setFieldValue(field.name, value?.value);
						onValueChange?.(value);
					}
				}}
				renderOption={(props, option) => {
					return (
						<li {...props} key={option.value}>
							<Typography>{option.label}</Typography>
						</li>
					);
				}}
				renderInput={(params) => (
					<TextField
						onFocus={() => form.setFieldTouched(field.name, true, true)}
						error={Boolean(errorText)}
						helperText={errorText}
						name={field.name}
						{...params}
						label={label}
						required={props.required}
					/>
				)}
				value={
					props.multiple
						? options.filter((option) => field.value?.includes(option.value)) ??
						  []
						: options.find((option) => option.value === field.value) ?? null
				}
			/>
		</Box>
	);
};
