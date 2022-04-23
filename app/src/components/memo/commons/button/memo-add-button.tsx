import type { ReactNode, VFC } from 'react';
import { IconButton, IconButtonProps, IconProps, Tooltip, TooltipProps } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface MemoAddButtonProps {
  fontSize?: IconProps['fontSize'];
  toolTipTitle: string;
  toolTipPlacement?: TooltipProps['placement'];
  onClickAction: IconButtonProps['onClick'];
  form?: string;
  type?: string;
  children?: ReactNode;
}

export const MemoAddButton: VFC<MemoAddButtonProps> = (props) => {
  const {
    fontSize,
    toolTipTitle,
    toolTipPlacement,
    onClickAction,
    form,
    type,
    children,
    ...other
  } = props;

  return (
    <Tooltip title={toolTipTitle} placement={toolTipPlacement}>
      <IconButton
        onClick={onClickAction}
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <AddCircleOutlineIcon fontSize={fontSize} />
        {children}
      </IconButton>
    </Tooltip>
  );
};

MemoAddButton.defaultProps = {
  fontSize: 'medium',
  toolTipPlacement: 'left',
};
