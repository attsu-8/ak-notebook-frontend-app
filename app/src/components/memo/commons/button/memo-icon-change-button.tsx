import { IconButton, IconProps, Tooltip, TooltipProps } from '@mui/material';
import { VFC } from 'react';

interface MemoIconChangeButtonProps {
  fontSize?: IconProps['fontSize'];
  toolTipTitle: string;
  toolTipPlacement?: TooltipProps['placement'];
  onClickAction: (isOpen: boolean) => void;
  icon: IconProps;
}

export const MemoIconChangeButton: VFC<MemoIconChangeButtonProps> = (props) => {
  const { fontSize, toolTipTitle, toolTipPlacement, onClickAction, icon, ...other } = props;

  return (
    <Tooltip title={toolTipTitle} placement={toolTipPlacement}>
      <IconButton onClick={() => onClickAction(true)}>{icon}</IconButton>
    </Tooltip>
  );
};

MemoIconChangeButton.defaultProps = {
  fontSize: 'large',
  toolTipPlacement: 'top',
};
