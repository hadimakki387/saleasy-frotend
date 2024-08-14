import React from 'react';
import { Button, IconButton } from '@mui/material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Close } from '@mui/icons-material';

const ActionButton = ({ onClick, label, icon, size = 'large', variant = 'contained' }) => {
  return (
    <Button
      onClick={onClick}
      sx={{ textTransform: 'capitalize' }}
      size={size}
      variant={variant}
    >
      {icon && React.cloneElement(icon, { sx: { mr: 1 } })}
      {label}
    </Button>
  );
};

const CloseButton = ({ onClick }) => {
  return (
    <IconButton
      sx={{
        ":hover": { color: 'red', rotate: '180deg', transition: '0.3s' },
        position: 'absolute',
        top: 0,
        right: 10,
      }}
      onClick={onClick}
    >
      <Close />
    </IconButton>
  );
};

export { ActionButton, CloseButton };






// import React, { ReactNode } from 'react';
// import { Button, IconButton } from '@mui/material';
// import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
// import { Close } from '@mui/icons-material';

// interface ActionButtonProps {
//   onClick: () => void;
//   label: string;
//   icon?: ReactNode;
//   size?: 'small' | 'medium' | 'large';
//   variant?: 'text' | 'outlined' | 'contained';
// }

// const ActionButton: React.FC<ActionButtonProps> = ({
//   onClick,
//   label,
//   icon,
//   size = 'large',
//   variant = 'contained',
// }) => {
//   return (
//     <Button
//       onClick={onClick}
//       sx={{ textTransform: 'capitalize' }}
//       size={size}
//       variant={variant}
//     >
//       {icon && React.cloneElement(icon as React.ReactElement, { sx: { mr: 1 } })}
//       {label}
//     </Button>
//   );
// };

// interface CloseButtonProps {
//   onClick: () => void;
// }

// const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
//   return (
//     <IconButton
//       sx={{
//         ":hover": { color: 'red', rotate: '180deg', transition: '0.3s' },
//         position: 'absolute',
//         top: 0,
//         right: 10,
//       }}
//       onClick={onClick}
//     >
//       <Close />
//     </IconButton>
//   );
// };

// export { ActionButton, CloseButton };
