import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ToolTip from "@mui/material/Tooltip";
import { Avatar, Link, Typography, styled } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import UserOutlinedIcon from "@mui/icons-material/Person";
import { useAuthStore } from "@store/auth";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			overflowX: "hidden",
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9),
			},
		}),
	},
}));

export default function LoggedInLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { session, signOut } = useAuthStore();
	const [selectedPath, setSelectedPath] = React.useState<string>(
		window.location.pathname
	);
	const [open, setOpen] = React.useState(false);
	const toggleDrawer = () => setOpen(!open);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	React.useEffect(() => {
		setSelectedPath(window.location.pathname);
	}, [window.location.pathname]);

	const drawerItems = [
		{
			name: "Projects",
			icon: <AssignmentIcon />,
			path: "/",
		},
		{
			name: "Users",
			icon: <PeopleIcon />,
			path: "/users",
		},
	];

	const userDrawerItems = drawerItems.filter((item) => {
		if (session?.user.role === "USER" && item.name === "Users") {
			return false;
		}
		return true;
	});

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar position="absolute" open={open}>
				<Toolbar
					sx={{
						pr: "24px", // keep right padding when drawer closed
					}}
				>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={toggleDrawer}
						sx={{
							marginRight: "36px",
							...(open && { display: "none" }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						sx={{ flexGrow: 1 }}
					>
						Task Tracker
					</Typography>
					<Avatar
						sx={{ ml: "auto" }}
						component={IconButton}
						onClick={handleMenu}
					>
						<UserOutlinedIcon />
					</Avatar>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
					>
						<MenuItem
							onClick={() => {
								handleClose();
								signOut();
							}}
						>
							Logout
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<Toolbar
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						px: [1],
					}}
				>
					<IconButton onClick={toggleDrawer}>
						<ChevronLeftIcon />
					</IconButton>
				</Toolbar>
				<Divider />
				<List component="nav">
					{userDrawerItems.map((item) => (
						<ToolTip title={item.name} key={item.name} placement="right-end">
							<ListItem
								key={item.name}
								disablePadding
								sx={{ display: "block" }}
							>
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open ? "initial" : "center",
										px: 2.5,
									}}
									selected={selectedPath === item.path}
									LinkComponent={Link}
									href={item.path}
									onClick={(_) => setSelectedPath(item.path)}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : "auto",
											justifyContent: "center",
										}}
									>
										{item.icon}
									</ListItemIcon>
									<ListItemText
										primary={item.name}
										sx={{ opacity: open ? 1 : 0 }}
									/>
								</ListItemButton>
							</ListItem>
						</ToolTip>
					))}
				</List>
			</Drawer>
			<Box
				component="main"
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === "light"
							? theme.palette.grey[100]
							: theme.palette.grey[900],
					flexGrow: 1,
					height: "100vh",
					overflow: "auto",
				}}
			>
				<Toolbar />
				<Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
			</Box>
		</Box>
	);
}
