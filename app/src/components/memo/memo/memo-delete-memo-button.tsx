import type { VFC } from 'react';
import { useSelector } from 'react-redux';
import { MemoSubmitButton } from '../commons/button/memo-submit-button';
import { selectEditMemo } from '../../../slices/memo/memoSlice';

interface DeleteMemoButtonProps {
  formId: string;
  onClick: (parentMemoCategoryId: string) => void;
}

export const DeleteMemoButton: VFC<DeleteMemoButtonProps> = (props) => {
  const { formId, onClick, ...other } = props;
  const editMemo = useSelector(selectEditMemo);

  return (
    <MemoSubmitButton toolTipTitle='submit' form={formId} onClick={() => onClick(editMemo.memoId)}>
      <>Delete</>
    </MemoSubmitButton>
  );
};
