import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import React from 'react';

function getSquareRender(value) {
  return value === 'o'
    ? (
      <PanoramaFishEyeIcon
        style={{ height: 'auto', width: '-webkit-fill-available' }}
      />
    )
    : value === 'x'
      ? (
        <CloseIcon style={{ height: 'auto', width: '-webkit-fill-available' }} />
      )
      : (
        <Box component='section' />
      );
}

export default getSquareRender;
