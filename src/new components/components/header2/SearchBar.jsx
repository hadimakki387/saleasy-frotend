

import { useState, MouseEvent } from 'react';
import { styled } from '@mui/material/styles';
import {
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
  InputBase,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  flexGrow: 0.4,
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid #777',
  '&:hover': {
    border: '1px solid #333',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '266px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '330px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#777',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const options = ['All Categories', 'CAR', 'Clothes', 'Electronics'];

const SearchBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClickListItem = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Search
      sx={{
        display: 'flex',
        borderRadius: '22px',
        justifyContent: 'space-between',
      }}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
      <div>
        <List
          component="nav"
          aria-label="Device settings"
          sx={{
            bgcolor: theme.palette.myColor.main,
            borderBottomRightRadius: 22,
            borderTopRightRadius: 22,
            p: '0',
          }}
        >
          <ListItem
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
          >
            <ListItemText
              sx={{
                width: 93,
                textAlign: 'center',
                '&:hover': { cursor: 'pointer' },
              }}
              secondary={options[selectedIndex]}
            />
            <ExpandMore sx={{ fontSize: '16px' }} />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              sx={{ fontSize: '13px' }}
              key={option}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Search>
  );
};

export default SearchBar;
