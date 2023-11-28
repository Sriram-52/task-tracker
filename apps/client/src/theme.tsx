import React from "react";
import {
	Link as RouterLink,
	LinkProps as RouterLinkProps,
} from "react-router-dom";
import { LinkProps } from "@mui/material/Link";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/700.css";
import { createTheme } from "@mui/material";
import type {} from "@mui/x-data-grid/themeAugmentation";

const LinkBehavior = React.forwardRef<
	HTMLAnchorElement,
	Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
	const { href, ...other } = props;
	// Map href (Material UI) -> to (react-router)
	return <RouterLink ref={ref} to={href} {...other} />;
});

export const theme = createTheme({
	palette: {
		primary: {
			main: "#3498db",
		},
		secondary: {
			main: "#2ecc71 ",
		},
		background: {
			default: "#ecf0f1",
		},
		text: {
			primary: "#2c3e50",
		},
		action: {
			selectedOpacity: 0.5,
		},
	},
	components: {
		MuiLink: {
			defaultProps: {
				component: LinkBehavior,
			} as LinkProps,
		},
		MuiButtonBase: {
			defaultProps: {
				LinkComponent: LinkBehavior,
			},
		},
		MuiDataGrid: {
			defaultProps: {
				sx(theme) {
					return {
						"& .MuiDataGrid-columnHeaderTitle": {
							fontWeight: "bold",
							color: theme.palette.text.primary,
						},
					};
				},
			},
		},
		MuiDialog: {
			defaultProps: {
				fullWidth: true,
				maxWidth: "sm",
			},
		},
	},
});
