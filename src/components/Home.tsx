import {
	Grid,
	Typography,
	Box,
	TextField,
	Button,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Header from './Header';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Quota = styled(Typography)(({ theme }) => ({
	...theme.typography.h2,
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const NextQuota = styled(Typography)(({ theme }) => ({
	...theme.typography.body1,
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

function Home() {
	const [quota, setQuota] = useState(750);
	const [nextQuota, setNextQuota] = useState(quota);
	const [amount, setAmount] = useState<any>('');
	const [enablePercentage, setEnablePercentage] = useState(true);
	const [enableChangeQuota, setEnableChangeQuota] = useState(false);

	const onAmountChange = (e: any) => {
		e.preventDefault();
		calculateNewQuota(e.target.value);
	};

	const saveNewQuota = () => {
		setQuota(nextQuota);
		setAmount('');
	};

	const calculateNewQuota = (amount: number) => {
		setAmount(amount);

		const newQuota = enablePercentage
			? Math.round((quota - amount * 0.7) * 100) / 100
			: Math.round((quota - amount)  * 100) / 100;
		setNextQuota(newQuota);
	};

	const updateQuota = () => {
		setQuota(amount);
		setAmount('');
	};

	return (
		<>
			<Header />
			<Box mt={3} px={3}>
				<Grid
					container
					mx="auto"
					alignItems={'center'}
					justifyContent={'space-between'}
					rowSpacing={2}
				>
					<Grid item xs={12} mt={4}>
						<Quota>{quota}€</Quota>
					</Grid>
						<Grid item xs={12}>
                             <NextQuota>
								{amount && !enableChangeQuota ? `Neues Kontingent: ${nextQuota}€` : '\u2060'}
							</NextQuota>
						</Grid>
					<Grid item mt={1} xs={7}>
						<TextField
							type="number"
							label="Betrag"
							onChange={onAmountChange}
							value={amount}
							focused
							fullWidth
						/>
					</Grid>
					<Grid item mt={1} xs={4}>
						{enableChangeQuota ? (
							<Button
								startIcon={<AddCircleIcon />}
								color="info"
								variant="contained"
								onClick={updateQuota}
								fullWidth
								style={{ height: '53px' }}
							>
								update
							</Button>
						) : (
							<Button
								startIcon={<AddShoppingCartIcon />}
								color="success"
								variant="contained"
								onClick={saveNewQuota}
								fullWidth
								style={{ height: '53px' }}
							>
								Add
							</Button>
						)}
					</Grid>
					<Grid item xs={12}>
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox
										onChange={(e) =>
											setEnablePercentage(
												e.target.checked
											)
										}
										name="enablePercentage"
										defaultChecked
									/>
								}
								label="-30% rechnen"
							/>
							<FormControlLabel
								control={
									<Checkbox
										onChange={(e) =>
											setEnableChangeQuota(
												e.target.checked
											)
										}
										name="enableChangeQuota"
									/>
								}
								label="Kontigent ändern"
							/>
						</FormGroup>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

export default Home;
