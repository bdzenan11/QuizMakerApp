import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { removeQuiz } from '../API/API';
import { COMMON, CONFIRMATION } from '../utils/consts';
import { Box } from '@mui/material';

export default function ConfirmationDialog(props: {
	open: boolean;
	handleClose: () => void;
	id: number;
}) {
	const { open, handleClose, id } = props;

	return (
		<Dialog open={open} onClose={handleClose} className="confirmation-dialog">
			<DialogTitle className="confirmation-dialog-title">{CONFIRMATION.TITLE}</DialogTitle>
			<Typography className="confirmation-dialog-text">{CONFIRMATION.CONFIRM}</Typography>
			<Box className="confirmation-dialog-button-group">
				<Button
					variant="contained"
					color="error"
					onClick={() => {
						removeQuiz(id);
						handleClose();
					}}
					className="confirmation-dialog-button quiz_form-button"
				>
					{COMMON.DELETE}
				</Button>
				<Button onClick={handleClose} className="confirmation-dialog-button quiz_form-button">
					{COMMON.CANCEL}
				</Button>
			</Box>
		</Dialog>
	);
}
