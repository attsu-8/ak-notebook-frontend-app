import { VFC } from 'react';
import { Popover, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { CirclePicker } from 'react-color';
import PropTypes from 'prop-types';

interface ColorPickerPopOverProps {
  anchorEl: null | Element;
  onClose: (isOpen: boolean) => void;
  isOpen: boolean;
  onChange: (color: string) => void;
}

export const ColorPickerPopOver: VFC<ColorPickerPopOverProps> = (props) => {
  const { anchorEl, onClose, isOpen, onChange, ...other } = props;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      keepMounted
      onClose={() => onClose(false)}
      open={isOpen}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant='subtitle1' sx={{ mb: 1 }}>
          ノートの色を選択
        </Typography>
        <CirclePicker
          onChange={(event: any) => {
            onChange(event.hex);
            onClose(false);
          }}
        />
      </Box>
    </Popover>
  );
};

ColorPickerPopOver.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};
