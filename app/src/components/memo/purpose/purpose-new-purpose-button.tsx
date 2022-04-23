import type { VFC } from 'react';
import { MemoSubmitButton } from '../commons/button/memo-submit-button';

interface NewPurposeButtonProps {
  formId: string;
}

export const NewPurposeButton: VFC<NewPurposeButtonProps> = (props) => {
  const { formId, ...other } = props;

  return (
    <MemoSubmitButton toolTipTitle='submit' form={formId}>
      <>New</>
    </MemoSubmitButton>
  );
};
