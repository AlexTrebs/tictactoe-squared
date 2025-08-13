import PropTypes from 'prop-types';
import React from 'react';

export default function GamePopover({ isOpened, game }) {
  return (
    <Popover
      anchorReference={'none'}
      open={isOpened}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ height: '75Vmin', width: '75Vmin' }}>{game}</div>
    </Popover>
  );
}

GamePopover.propTypes = {
  isOpened: PropTypes.bool,
  game: React.ReactNode,
};
