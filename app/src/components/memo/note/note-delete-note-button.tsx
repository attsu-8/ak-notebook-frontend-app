import type { VFC } from 'react';
import { useSelector } from 'react-redux';
import { selectEditNote } from '../../../slices/memo/noteSlice';
import { MemoSubmitButton } from '../commons/button/memo-submit-button';

interface DeleteNoteButtonProps {
  formId: string;
  onClick: (noteId: string) => void;
}

export const DeleteNoteButton: VFC<DeleteNoteButtonProps> = (props) => {
  const { formId, onClick, ...other } = props;
  const editNote: any = useSelector(selectEditNote);

  return (
    <MemoSubmitButton toolTipTitle='submit' form={formId} onClick={() => onClick(editNote.noteId)}>
      <>Delete</>
    </MemoSubmitButton>
  );
};
