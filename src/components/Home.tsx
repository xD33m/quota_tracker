import { Grid, Typography, TextField, Button, FormGroup, FormControlLabel, Checkbox, Fab, IconButton, useTheme, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ShoppingHistory, { HistoryItem } from './ShoppingHistory';
import Cart, { ChipData } from './Cart';
import { usePersistedState } from '../functions/persistState';
import { useContext } from 'react';
import { ColorModeContext } from '../App';

const Quota = styled(Typography)(({ theme }) => ({
	...theme.typography.h2,
	textAlign: 'center',
	fontWeight: 500,
	color: theme.palette.success.main,
}));

const NextQuota = styled(Typography)(({ theme }) => ({
	...theme.typography.body1,
	textAlign: 'center',
	color: theme.palette.text.primary,
}));

function Home() {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);

	const [quota, setQuota] = usePersistedState<number>('quota', 750);
	const [nextQuota, setNextQuota] = usePersistedState<number>('nextQuota', quota);
	const [amount, setAmount] = usePersistedState<any>('amount', '');
	const [enablePercentage, setEnablePercentage] = usePersistedState<boolean>('enablePercentag', true);
	const [enableChangeQuota, setEnableChangeQuota] = usePersistedState<boolean>('enableChangeQuota', false);
	const [chipData, setChipData] = usePersistedState<ChipData[]>('chipData', []);
	const [shoppingHistory, setShoppingHistory] = usePersistedState<HistoryItem[]>('shoppingHistory', []);	
	
	const handleChipDelete = (chipToDelete: ChipData) => () => {
		setQuota(Number(quota) + Number(chipToDelete.cost));
		setChipData((chips: ChipData[]) =>
			chips.filter((chip: ChipData) => chip.key !== chipToDelete.key)
		);
	};

	const handleHistoryItemDelete = (itemToDelete: HistoryItem) => () => {
		setChipData((chips: ChipData[]) => [...chips, ...itemToDelete.chipData]);
		setShoppingHistory((history: HistoryItem[]) =>
			history.filter((item: HistoryItem) => item.key !== itemToDelete.key)
		);
	};

	const addToCart = () => {
		const itemPrice = enablePercentage
			? Math.round(amount * 0.7 * 100) / 100
			: Math.round(amount * 100) / 100;

		const newChip: ChipData = {
			key: Date.now(),
			cost: itemPrice,
		};

		setQuota(nextQuota);
		setChipData((chips) => [...chips, newChip]);
		setAmount('');
	};

	const onAmountChange = (e: any) => {
		e.preventDefault();
		calculateNewQuota(e.target.value);
	};

	const calculateNewQuota = (amount: number) => {
		setAmount(amount);

		const newQuota = enablePercentage
			? Math.round((quota - amount * 0.7) * 100) / 100
			: Math.round((quota - amount) * 100) / 100;
		setNextQuota(newQuota);
	};

	const saveCart = () => {
		const totalCost = chipData.reduce((acc, item) => acc + item.cost, 0);
		const date = new Date();
		const dateString = `${String(date.getDate()).padStart(2, '0')}.${String(
			date.getMonth() + 1
		).padStart(2, '0')}.${date.getFullYear()}`;
		const historyItem: HistoryItem = {
			key: Date.now(),
			dateString,
			totalCost,
			chipData,
		};
		setShoppingHistory((history: HistoryItem[]) => [...history, historyItem]);
		setChipData([]);
	};

	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{
				minHeight: '100vh',
				backgroundColor:
					theme.palette.mode === 'dark'
						? theme.palette.background.default
						: theme.palette.grey[200],
			}}
		>
			<Typography
				variant="h2"
				mb={5}
				sx={{ fontWeight: '500', display: { md: 'block', xs: 'none' } }}
			>
				<span style={{color: theme.palette.primary.main}}>Quota</span> Tracker
			</Typography>
			<Card
				sx={{
					position: { md: 'relative' },
					height: { md: '60vh', xs: '100vh' },
					width: { md: '60vh' },
					padding: { md: '2rem', xs: '1.5rem' },
				}}
			>
				<Grid
					container
					mx="auto"
					alignItems={'center'}
					justifyContent={'space-between'}
					rowSpacing={2}
				>
					<Grid item xs={12} mt={4}>
						<Quota>
							<span style={{ color: quota < 0 ? 'red' : undefined }}>
								{(Math.round(quota * 100) / 100).toFixed(2)}€
							</span>
						</Quota>
					</Grid>
					<Grid item xs={12}>
						<NextQuota>
							{amount && !enableChangeQuota ? (
								<>
									{'New quota: '}
									<span
										style={{ color: nextQuota < 0 ? 'red' : undefined}}>
										{(Math.round(nextQuota * 100) / 100).toFixed(2)}€
									</span>
								</>
							) : ('\u2060')}
						</NextQuota>
					</Grid>
					<Grid item mt={1} xs={7}>
						<TextField
							type="number"
							label="Amount"
							onChange={onAmountChange}
							value={amount}
							focused
							fullWidth
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									if (enableChangeQuota) {
										setQuota(amount);
										setAmount('');
									} else {
										addToCart();
									} 
								}
							}}
						/>
					</Grid>
					<Grid item mt={1} xs={4}>
						{enableChangeQuota ? (
							<Button
								startIcon={<AddCircleIcon />}
								color="info"
								variant="contained"
								onClick={() => {
									setQuota(amount);
									setAmount('');
								}}
								fullWidth
								style={{ height: '53px' }}
								disabled={!amount}
							>
								update
							</Button>
						) : (
							<Button
								startIcon={<AddShoppingCartIcon />}
								color="success"
								variant="contained"
								onClick={addToCart}
								fullWidth
								style={{ height: '53px' }}
								disabled={!amount}
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
												!enablePercentage
											)
										}
										name="enablePercentage"
										checked={enablePercentage}
									/>
								}
								label="substract 30%"
							/>
							<FormControlLabel
								control={
									<Checkbox
										onChange={(e) =>
											setEnableChangeQuota(
												!enableChangeQuota
											)
										}
										name="enableChangeQuota"
										checked={enableChangeQuota}
									/>
								}
								label="update quota"
							/>
						</FormGroup>
					</Grid>
					<Grid item xs={12}>
						<Cart
							chipData={chipData}
							handleChipDelete={handleChipDelete}
						/>
					</Grid>
					<Grid item xs={12}>
						<ShoppingHistory
							history={shoppingHistory}
							handleHistoryItemDelete={handleHistoryItemDelete}
						/>
					</Grid>
					<Fab
						color="primary"
						aria-label="save"
						style={{
							position: 'absolute',
							bottom: 0,
							right: 0,
							margin: '1rem',
						}}
						onClick={saveCart}
						disabled={!chipData.length}
					>
						<ShoppingBasketIcon />
					</Fab>
					<IconButton
						style={{
						position: 'absolute',
						top: 0,
						right: 0,
							opacity: 0.8,
						margin: '1rem',
						}}
						onClick={colorMode.toggleColorMode}
						color="inherit"
					>
						{theme.palette.mode === 'dark' ? (
							<Brightness7Icon />
						) : (
							<Brightness4Icon />
						)}
					</IconButton>
				</Grid>
			</Card>
		</Grid>
	);
}

export default Home;
