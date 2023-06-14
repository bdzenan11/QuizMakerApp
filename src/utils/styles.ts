import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: '0',
				},
			},
		},
	},
});

export const modalStyle = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90%',
	maxWidth: 700,
	boxShadow: 24,
	height: 550,
	p: 4,

	'@media (max-width: 600px)': {
		width: '95%',
	},
};
