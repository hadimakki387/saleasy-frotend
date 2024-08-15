import React from 'react';
import { Drawer, Box, IconButton, Accordion } from '@mui/material';
import Close from '@mui/icons-material/Close';
import AccordionItem from './AccordionItem';

interface DrawerMenuProps {
  open: boolean;
  onClose: () => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, onClose }) => {
  const items = [
    { mainLink: 'Home', subLinks: ['Link 1', 'Link 2', 'Link 3'] },
    { mainLink: 'Mega menu', subLinks: ['Link 1', 'Link 2', 'Link 3'] },
    { mainLink: 'Full screen menu', subLinks: ['Link 1', 'Link 2', 'Link 3'] },
    { mainLink: 'Pages', subLinks: ['Link 1', 'Link 2', 'Link 3'] },
    { mainLink: 'User account', subLinks: ['Link 1', 'Link 2', 'Link 3'] },
    { mainLink: 'Vendor account', subLinks: ['Link 1', 'Link 2', 'Link 3'] },
  ];

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      sx={{ ".MuiPaper-root": { height: "100%" } }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 444,
          mx: 'auto',
          mt: 6,
          position: 'relative',
          pt: 10,
        }}
      >
        <IconButton
          sx={{
            ":hover": { color: 'red', transition: 'color 0.3s' },
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          onClick={onClose}
          aria-label="Close menu"
        >
          <Close />
        </IconButton>

        {items.map((item) => (
          <AccordionItem key={item.mainLink} mainLink={item.mainLink} subLinks={item.subLinks} />
        ))}
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;