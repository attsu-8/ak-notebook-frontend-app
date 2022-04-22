import type { VFC } from 'react';
import { MemoSubmitButton } from '../commons/button/memo-submit-button';

interface UpdateNoteButtonProps {
  formId: string;
}

export const UpdateNoteButton: VFC<UpdateNoteButtonProps> = (props) => {
  const { formId, ...other } = props;

  return (
    <MemoSubmitButton toolTipTitle='submit' form={formId}>
      <>Edit</>
    </MemoSubmitButton>
  );
};
