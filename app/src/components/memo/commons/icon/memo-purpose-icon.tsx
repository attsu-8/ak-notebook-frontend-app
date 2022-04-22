import { VFC } from 'react';
import { IconProps } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';

interface MemoPurposeIconProps {
  fontSize?: IconProps['fontSize'];
  iconColor?: string;
}

export const MemoPurposeIcon: VFC<MemoPurposeIconProps> = (props) => {
  const { fontSize, iconColor, ...other } = props;
  return (
    <>
      <FlagIcon
        fontSize={fontSize}
        sx={{
          color: iconColor,
        }}
      />
    </>
  );
};

MemoPurposeIcon.defaultProps = {
  fontSize: 'medium',
  iconColor: '#6A7280',
};
