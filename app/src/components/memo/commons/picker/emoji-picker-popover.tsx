import { VFC } from "react";
import { Popover } from "@mui/material";
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';


interface EmojiPickerPopOverProps {
    anchorEl: null | Element;
    onClose?: () => void;
    open?: boolean;
    setEmoji?: (emoji: string) => void;
}


export const EmojiPickerPopOver:VFC<EmojiPickerPopOverProps> = (props) => {
    const { anchorEl, onClose, open, setEmoji, ...other } = props;
    
    const handleSelect = (emojiId) => {
        setEmoji(emojiId)
        onClose()
    }

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom'
            }}
            keepMounted
            onClose={onClose}
            open={open}
            transitionDuration={0}
            {...other}
        >
            <Picker
                onSelect={emoji => handleSelect(emoji.id)}
                set="google"
            />
        </Popover>
    );
};