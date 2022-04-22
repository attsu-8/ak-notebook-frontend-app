import type { ReactNode, VFC } from 'react';
import { Button, ButtonProps, Tooltip, TooltipProps } from '@mui/material';

interface MemoSubmitButtonProps {
  toolTipTitle: string;
  toolTipPlacement?: TooltipProps['placement'];
  children: ReactNode;
  sx?: ButtonProps['sx'];
  form?: string;
  onClick?: ButtonProps['onClick'];
}

export const MemoSubmitButton: VFC<MemoSubmitButtonProps> = (props) => {
  const { toolTipTitle, toolTipPlacement, children, sx, form, onClick, ...other } = props;

  return (
    <Tooltip title={toolTipTitle} placement={toolTipPlacement}>
      <Button type='submit' variant='contained' form={form} sx={sx} onClick={onClick}>
        {children}
      </Button>
    </Tooltip>
  );
};

MemoSubmitButton.defaultProps = {
  toolTipPlacement: 'left',
};
