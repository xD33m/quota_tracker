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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Cart, { ChipData } from './Cart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Fab from '@mui/material/Fab';
import ShoppingHistory, { HistoryItem } from './ShoppingHistory';

const Quota = styled(Typography)(({ theme }) => ({
	...theme.typography.h2,
	textAlign: 'center',
	color: theme.palette.success.main,
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
	const [chipData, setChipData] = useState<ChipData[]>([]);
	const [shoppingHistory, setShoppingHistory] = useState<HistoryItem[]>([]);

	const handleChipDelete = (chipToDelete: ChipData) => () => {
		setQuota(Number(quota) + Number(chipToDelete.cost));
		setChipData((chips) =>
			chips.filter((chip) => chip.key !== chipToDelete.key)
		);
	};

	const handleHistoryItemDelete = (itemToDelete: HistoryItem) => () => {
		setChipData(itemToDelete.chipData);
		setShoppingHistory((history) =>
			history.filter((item) => item.key !== itemToDelete.key)
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
		const dateString = `${String(date.getDate()).padStart(2, '0')}-${String(
			date.getMonth() + 1
		).padStart(2, '0')}-${date.getFullYear()}`;
		const historyItem: HistoryItem = {
			key: Date.now(),
			dateString,
			totalCost,
			chipData,
		};
		setShoppingHistory((history) => [...history, historyItem]);
		setChipData([]);
	};

	return (
		<>
			<Box mt={2} px={3}>
				<Grid
					container
					mx="auto"
					alignItems={'center'}
					justifyContent={'space-between'}
					rowSpacing={2}
				>
					<Grid item xs={12} mt={4}>
						<Quota>
							{Math.round((quota) * 100) / 100}€
						</Quota>
					</Grid>
					<Grid item xs={12}>
						<NextQuota>
							{amount && !enableChangeQuota
								? `Neues Kontingent: ${
										Math.round(
											(nextQuota) * 100
										) / 100
								  }€`
								: '\u2060'}
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
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									if(enableChangeQuota){
										setQuota(amount);
										setAmount('');
									}else{
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
								onClick={() => {setQuota(amount); setAmount('');}}
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
				</Grid>
			</Box>
		</>
	);
}

export default Home;
