import * as React from 'react';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { styled } from '@mui/material/styles';
import { ListItem } from '@mui/material';
import { ChipData } from './Cart';

export interface HistoryItem {
    key: number;
	dateString: string;
	totalCost: number;
    chipData: ChipData[];
}

const HistoryListItem = styled(ListItem)(({ theme }) => ({
	margin: theme.spacing(0.5),
    paddingLeft: 0,
}));

const HistoryListItemAvatar = styled(ListItemAvatar)(({ theme }) => ({
    minWidth: '35px',
    color: theme.palette.success.main,
}));


export default function ShoppingHistory(props: any) {
	const { history, handleHistoryItemDelete } = props;
	return (
        <List dense>
            {history.map((item: HistoryItem, index: number) => (
                <HistoryListItem
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={handleHistoryItemDelete(item)}>
                            <CloseIcon/>
                        </IconButton>
                    }
                    key={item.key}
                >
                    <HistoryListItemAvatar>
                        <ShoppingBasketIcon />
                    </HistoryListItemAvatar>
                    <ListItemText
                        primary={`${item.dateString}: ${item.totalCost}€`}
                    />
                </HistoryListItem>
            ))}
        </List>
	);
}
