import { IconButton } from "@mui/material";
import React from 'react';

function ControlsButton({children, onClick}) {
  return (
    <IconButton onClick={onClick} sx={{ borderRadius: '4px !important' }}>
      {children}
    </IconButton>
  );
}

export default ControlsButton;
