import { VFC } from 'react';
import { IconProps } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface MemoPropertyIconProps {
  fontSize?: IconProps['fontSize'];
  iconColor?: string;
}

export const MemoPropertyIcon: VFC<MemoPropertyIconProps> = (props) => {
  const { fontSize, iconColor, ...other } = props;
  return (
    <>
      <MoreHorizIcon
        fontSize={fontSize}
        sx={{
          color: iconColor,
        }}
      />
    </>
  );
};

MemoPropertyIcon.defaultProps = {
  fontSize: 'medium',
  iconColor: '#6A7280',
};
