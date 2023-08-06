import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { Box } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import currency from 'currency.js';

export interface ChipData {
	key: number;
	cost: number;
}

const ListItem = styled('li')(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

export default function Cart(props: any) {

	const { handleChipDelete, chipData } = props;
	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				listStyle: 'none',
				p: 0,
				m: 0,
			}}
			component="ul"
		>
			{chipData.map((data: ChipData) => {
				return (
					<ListItem key={data.key}>
						<Chip
							icon={<LocalOfferIcon />}
							label={`${currency(data.cost)}€`}
							onDelete={handleChipDelete(data)}
						/>
					</ListItem>
				);
			})}
		</Box>
	);
}
