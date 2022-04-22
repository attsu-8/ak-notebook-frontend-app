import { VFC } from 'react';
import { ListItem, ListItemText, ListItemIcon, IconProps } from '@mui/material';
import { MemoEditButton } from '../button/memo-edit-button';
import { MemoDeleteButton } from '../button/memo-delete-button';
import { Note } from '../../../../types/memo/note';
import { Purpose } from '../../../../types/memo/purpose';
import { ParentMemoCategory as ParentMemo } from '../../../../types/memo/memoCategory';
import { ChildMemoCategory as ChildMemo } from '../../../../types/memo/memoCategory';

interface MemoEmojiIconProps {
  emojiId: string | null;
  emojiSize?: Number;
  defaultIcon: IconProps;
}

type ItemData = Note | Purpose | ParentMemo | ChildMemo;

interface MemoDialogListProps {
  listItemIcon: IconProps | VFC<MemoEmojiIconProps>;
  listText: string;
  itemData: ItemData;
  editButtonClick: (itemData: ItemData) => void;
  deleteButtonClick: (itemData: ItemData) => void;
}

export const MemoDialogListItem: VFC<MemoDialogListProps> = (props) => {
  const { listItemIcon, listText, itemData, editButtonClick, deleteButtonClick, ...other } = props;

  return (
    <ListItem disablePadding>
      <ListItemIcon>{listItemIcon}</ListItemIcon>

      <ListItemText primary={listText} />

      <MemoEditButton toolTipTitle='ノート編集' onClick={() => editButtonClick(itemData)} />

      <MemoDeleteButton toolTipTitle='ノート削除' onClick={() => deleteButtonClick(itemData)} />
    </ListItem>
  );
};
