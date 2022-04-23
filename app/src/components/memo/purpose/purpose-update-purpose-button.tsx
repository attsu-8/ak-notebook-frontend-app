import type { VFC } from 'react';
import { MemoSubmitButton } from '../commons/button/memo-submit-button';

interface UpdatePurposeButtonProps {
  formId: string;
}

export const UpdatePurposeButton: VFC<UpdatePurposeButtonProps> = (props) => {
  const { formId, ...other } = props;

  return (
    <MemoSubmitButton toolTipTitle='submit' form={formId}>
      <>Edit</>
    </MemoSubmitButton>
  );
};
