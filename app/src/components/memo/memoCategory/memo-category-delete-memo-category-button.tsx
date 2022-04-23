import type { VFC } from 'react';
import { useSelector } from 'react-redux';
import { selectEditMemoCategory } from '../../../slices/memo/memoCategorySlice';
import { MemoSubmitButton } from '../commons/button/memo-submit-button';

interface DeleteMemoCategoryButtonProps {
  formId: string;
  onClick: (parentMemoCategoryId: string) => void;
}

export const DeleteMemoCategoryButton: VFC<DeleteMemoCategoryButtonProps> = (props) => {
  const { formId, onClick, ...other } = props;
  const editMemoCategory: any = useSelector(selectEditMemoCategory);

  return (
    <MemoSubmitButton
      toolTipTitle='submit'
      form={formId}
      onClick={() => onClick(editMemoCategory.memoCategoryId)}
    >
      <>Delete</>
    </MemoSubmitButton>
  );
};
