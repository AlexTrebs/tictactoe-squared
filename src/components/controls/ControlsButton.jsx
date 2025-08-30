import { IconButton } from '@mui/material';
import React from 'react';

function ControlsButton({ children, ...props }) {
  return (
    <IconButton sx={{ borderRadius: '4px' }} {...props}>
      {children}
    </IconButton>
  );
}

export default ControlsButton;
