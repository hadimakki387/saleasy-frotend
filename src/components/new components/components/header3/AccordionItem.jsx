import { Accordion, AccordionSummary, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionItem = ({ mainLink, subLinks }) => {
  return (
    <Accordion elevation={0} sx={{ bgcolor: "initial" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{mainLink}</Typography>
      </AccordionSummary>
      <List sx={{ py: 0, my: 0 }}>
        {subLinks.map((link) => (
          <ListItem key={link} sx={{ py: 0, my: 0 }}>
            <ListItemButton>
              <ListItemText primary={link} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Accordion>
  );
};

export default AccordionItem;


// import { FC } from "react";
// import { Accordion, AccordionSummary, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// interface AccordionItemProps {
//   mainLink: string;
//   subLinks: string[];
// }

// const AccordionItem: FC<AccordionItemProps> = ({ mainLink, subLinks }) => {
//   return (
//     <Accordion elevation={0} sx={{ bgcolor: "initial" }}>
//       <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="panel1a-content"
//         id="panel1a-header"
//       >
//         <Typography>{mainLink}</Typography>
//       </AccordionSummary>
//       <List sx={{ py: 0, my: 0 }}>
//         {subLinks.map((link) => (
//           <ListItem key={link} sx={{ py: 0, my: 0 }}>
//             <ListItemButton>
//               <ListItemText primary={link} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Accordion>
//   );
// };

// export default AccordionItem;
