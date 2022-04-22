import { CardContent } from '@mui/material';
import { useState, VFC } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchAsyncCountBrowsingMemo,
  fetchAsyncPatchMemoText,
} from '../../../slices/memo/memoSlice';
import { Memo, memoTextProps } from '../../../types/memo/memo';
import { QuillEditor } from '../../commons/quill-editor';
import { debounce } from '../../../utils/debounce';

interface MemoCardContentProps {
  memo: Memo;
}

export const MemoCardContent: VFC<MemoCardContentProps> = (props) => {
  const { memo, ...other } = props;
  const dispatch = useDispatch();
  const [memoTextTimerId, setMemoTextTimerId] = useState(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChangeMemoText = (memoHTML) => {
    const memoTextData: memoTextProps = {
      memoId: memo.memoId,
      memoText: memoHTML,
    };
    debounce(
      () => {
        dispatch(fetchAsyncPatchMemoText(memoTextData));
        dispatch(fetchAsyncCountBrowsingMemo(memo.memoId));
      },
      memoTextTimerId,
      setMemoTextTimerId,
      2000,
    )();
  };

  return (
    <CardContent>
      <QuillEditor
        defaultValue={memo.memoText}
        onChange={(content, delta, source, editor) => {
          isFocused && handleChangeMemoText(editor.getContents());
        }}
        onFocus={() => setIsFocused(true)}
      />
    </CardContent>
  );
};
