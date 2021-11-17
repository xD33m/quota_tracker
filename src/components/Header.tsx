import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
	return (
		<AppBar elevation={7} position="static">
			<Toolbar>
				<Typography variant="h6">
					Kontigent
				</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
