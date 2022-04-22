import { ButtonProps, IconButtonProps } from '@mui/material';
import { VFC } from 'react';
import { useSelector } from 'react-redux';
import { selectEditPurpose } from '../../../slices/memo/purposeSlice';
import { MemoDialog } from '../commons/dialog/memo-dialog';

interface PurposeDeleteDialogProps {
  headerTitle: string;
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  footerButton: IconButtonProps | ButtonProps;
  formId: string;
}

export const PurposeDeleteDialog: VFC<PurposeDeleteDialogProps> = (props) => {
  const { headerTitle, isOpen, onClose, footerButton, formId, ...other } = props;

  const editPurpose = useSelector(selectEditPurpose);

  return (
    <MemoDialog
      isOpen={isOpen}
      onClose={() => onClose(false)}
      headerTitle={headerTitle}
      footerButton={footerButton}
    >
      <>{`purposeName: ${editPurpose.purposeName}`}</>
    </MemoDialog>
  );
};
