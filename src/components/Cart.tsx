import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { Box } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

interface ChipData {
	key: number;
	label: string;
}

const ListItem = styled('li')(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

export default function Cart() {
	const [chipData, setChipData] = React.useState<readonly ChipData[]>([
		{ key: 0, label: '123.20€' },
		{ key: 1, label: '10.95€' },
		{ key: 2, label: '10.95€' },
		{ key: 3, label: '65.95€' },
		{ key: 4, label: '100.00€' },
	]);

	const handleDelete = (chipToDelete: ChipData) => () => {
		setChipData((chips) =>
			chips.filter((chip) => chip.key !== chipToDelete.key)
		);
	};

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
			{chipData.map((data) => {
				return (
					<ListItem key={data.key}>
						<Chip
							icon={<LocalOfferIcon />}
							label={data.label}
							onDelete={handleDelete(data)}
						/>
					</ListItem>
				);
			})}
		</Box>
	);
}
