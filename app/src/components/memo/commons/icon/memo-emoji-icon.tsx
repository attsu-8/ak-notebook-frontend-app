import { VFC } from 'react';
import { Emoji } from 'emoji-mart';
import { IconProps } from '@mui/material';

interface MemoEmojiIconProps {
  emojiId: string | null;
  emojiSize?: Number;
  defaultIcon?: IconProps;
}

export const MemoEmojiIcon: VFC<MemoEmojiIconProps> = (props) => {
  const { emojiId, emojiSize, defaultIcon, ...other } = props;
  return (
    <>{emojiId ? <Emoji emoji={emojiId} size={emojiSize} set='google' /> : <>{defaultIcon}</>}</>
  );
};

MemoEmojiIcon.defaultProps = {
  emojiSize: 24,
};
