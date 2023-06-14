import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { COMMON, HOME, QUIZ, ROUTES } from '../utils/consts';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const navItems: { label: string; route: string }[] = [
	{ label: COMMON.HOME, route: ROUTES.HOME },
	{ label: QUIZ.QUIZZES, route: ROUTES.QUIZZES },
	{ label: COMMON.ABOUT, route: ROUTES.HOME },
];

export default function NavigationBar(props: { window?: () => Window }) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};
	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				{HOME.TITLE}
			</Typography>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item.label} disablePadding>
						<Link to={item.route}>
							<ListItemButton sx={{ textAlign: 'center' }}>
								<ListItemText primary={item.label} />
							</ListItemButton>
						</Link>
					</ListItem>
				))}
			</List>
		</Box>
	);
	const container = window !== undefined ? () => window().document.body : undefined;
	return (
		<Box sx={{ display: 'flex', background: '#000' }}>
			<CssBaseline />
			<AppBar
				component="nav"
				sx={{ background: 'linear-gradient(286.22deg,#313137 -.14%,#060607 94.41%)', border: 0 }}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
					>
						{HOME.TITLE}
					</Typography>
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{navItems.map((item) => (
							<Link to={item.route} key={item.label}>
								<Button sx={{ color: '#fff' }}>{item.label}</Button>
							</Link>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<Box component="nav">
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
}
