import React from "react";
import { FieldProps, getIn } from "formik";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";

export const DateFormField: React.FC<
	FieldProps & {
		label?: string;
		required?: boolean;
		minDate?: string;
		maxDate?: string;
		onValueChange?: (value: Dayjs) => void;
		disabled?: boolean;
	}
> = ({
	field,
	form,
	label,
	minDate,
	disabled,
	maxDate,
	onValueChange,
	...props
}) => {
	const errorText =
		getIn(form.touched, field.name) && getIn(form.errors, field.name);
	const [inputValue, setInputValue] = React.useState<Dayjs | null>(
		field.value ? dayjs(field.value).utc() : null
	);

	return (
		<Box sx={{ mt: 0.4 }}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker
					onChange={(value) => {
						if (value) {
							// remove the time from the date and set it to midnight and make it like T00:00:00.000Z
							value = value.utc().startOf("day");
							form.setFieldValue(field.name, value.toISOString(), true);
							onValueChange?.(value);
							setInputValue(value);
						} else {
							form.setFieldValue(field.name, null, true);
						}
					}}
					label={label}
					minDate={minDate ? dayjs(minDate, "YYYY-MM-DD") : undefined}
					maxDate={maxDate ? dayjs(maxDate, "YYYY-MM-DD") : undefined}
					value={inputValue}
					disabled={disabled}
					slotProps={{
						textField: {
							error: !!errorText,
							helperText: errorText,
							required: props.required,
							fullWidth: true,
							onFocus: () => form.setFieldTouched(field.name, true, true),
						},
					}}
				/>
			</LocalizationProvider>
		</Box>
	);
};
