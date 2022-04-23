import type { VFC } from 'react';
import { IconButton, IconProps, Tooltip, TooltipProps } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface MemoEditButtonProps {
  fontSize?: IconProps['fontSize'];
  toolTipTitle: string;
  toolTipPlacement?: TooltipProps['placement'];
  onClick: () => void;
}

export const MemoEditButton: VFC<MemoEditButtonProps> = (props) => {
  const { fontSize, toolTipTitle, toolTipPlacement, onClick, ...other } = props;

  return (
    <IconButton onClick={onClick}>
      <Tooltip title={toolTipTitle} placement={toolTipPlacement}>
        <EditIcon fontSize={fontSize} />
      </Tooltip>
    </IconButton>
  );
};

MemoEditButton.defaultProps = {
  fontSize: 'medium',
  toolTipPlacement: 'left',
};
