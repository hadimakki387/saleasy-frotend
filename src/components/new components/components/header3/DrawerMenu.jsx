import { Drawer, Box, IconButton, Accordion, AccordionSummary, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import Close from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionItem from "./AccordionItem";

const DrawerMenu = ({ open, onClose }) => {
  const items = [
    { mainLink: "Home", subLinks: ["Link 1", "Link 2", "Link 3"] },
    { mainLink: "Mega menu", subLinks: ["Link 1", "Link 2", "Link 3"] },
    { mainLink: "full screen menu", subLinks: ["Link 1", "Link 2", "Link 3"] },
    { mainLink: "pages", subLinks: ["Link 1", "Link 2", "Link 3"] },
    { mainLink: "user account", subLinks: ["Link 1", "Link 2", "Link 3"] },
    { mainLink: "vendor account", subLinks: ["Link 1", "Link 2", "Link 3"] },
  ];

  return (
    <Drawer
      anchor={"top"}
      open={open}
      onClose={onClose}
      sx={{ ".MuiPaper-root": { height: "100%" } }}
    >
      <Box
        sx={{ width: 444, mx: "auto", mt: 6, position: "relative", pt: 10 }}
      >
        <IconButton
          sx={{
            ":hover": { color: "red", rotate: "180deg", transition: "0.3s" },
            position: "absolute",
            top: 0,
            right: 10,
          }}
          onClick={onClose}
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





// import React from 'react';
// import { Drawer, Box, IconButton, Accordion } from '@mui/material';
// import Close from '@mui/icons-material/Close';
// import AccordionItem from './AccordionItem';

// interface DrawerMenuProps {
//   open: boolean;
//   onClose: () => void;
// }

// const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, onClose }) => {
//   const items = [
//     { mainLink: 'Home', subLinks: ['Link 1', 'Link 2', 'Link 3'] },
//     { mainLink: 'Mega menu', subLinks: ['Link 1', 'Link 2', 'Link 3'] },
//     { mainLink: 'full screen menu', subLinks: ['Link 1', 'Link 2', 'Link 3'] },
//     { mainLink: 'pages', subLinks: ['Link 1', 'Link 2', 'Link 3'] },
//     { mainLink: 'user account', subLinks: ['Link 1', 'Link 2', 'Link 3'] },
//     { mainLink: 'vendor account', subLinks: ['Link 1', 'Link 2', 'Link 3'] },
//   ];

//   return (
//     <Drawer
//       anchor={"top"}
//       open={open}
//       onClose={onClose}
//       sx={{ ".MuiPaper-root": { height: "100%" } }}
//     >
//       <Box
//         sx={{ width: 444, mx: 'auto', mt: 6, position: 'relative', pt: 10 }}
//       >
//         <IconButton
//           sx={{
//             ":hover": { color: 'red', rotate: '180deg', transition: '0.3s' },
//             position: 'absolute',
//             top: 0,
//             right: 10,
//           }}
//           onClick={onClose}
//         >
//           <Close />
//         </IconButton>

//         {items.map((item) => (
//           <AccordionItem key={item.mainLink} mainLink={item.mainLink} subLinks={item.subLinks} />
//         ))}
//       </Box>
//     </Drawer>
//   );
// };

// export default DrawerMenu;
