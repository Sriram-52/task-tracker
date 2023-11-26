import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export interface DialogTitleProps {
	id: string;
	children?: React.ReactNode;
	onClose: () => void;
}

function BootstrapDialogTitle(props: Readonly<DialogTitleProps>) {
	const { children, onClose } = props;

	return (
		<>
			<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
				{children}
			</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={onClose}
				sx={{
					position: "absolute",
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon />
			</IconButton>
		</>
	);
}

export default function AppDialogHeader({
	onClose,
	title,
}: Readonly<{
	onClose: () => void;
	title: string;
}>) {
	return (
		<BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
			{title}
		</BootstrapDialogTitle>
	);
}
