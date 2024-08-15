

import { KeyboardArrowUp } from "@mui/icons-material";
import { Fab, Zoom, useScrollTrigger } from "@mui/material";

const ScrollToTop: React.FC = () => {
  const trigger = useScrollTrigger({ threshold: 100 });

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Zoom in={trigger}>
      <Fab
        onClick={handleClick}
        variant="extended"
        size="small"
        sx={{ position: "fixed", bottom: 33, right: 33 }}
        color="primary"
        aria-label="scroll to top"
      >
        <KeyboardArrowUp fontSize="medium" />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop;
