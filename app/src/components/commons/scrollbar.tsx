import { forwardRef, MutableRefObject } from "react";
import SimpleBar from "simplebar-react";
import type {Theme} from "@mui/material";
import type {SxProps} from "@mui/system";
import { styled } from '@mui/material/styles';


interface ScrollbarProps extends SimpleBar.Props {
    ref: MutableRefObject<SimpleBar>;
    sx?: SxProps<Theme>;
}

const ScrollbarRoot = styled(SimpleBar)``;

export const Scrollbar = forwardRef<MutableRefObject<SimpleBar>,ScrollbarProps>((props, ref) => {
    return (
        <ScrollbarRoot
            ref={ref}
            {...props}
        />
    );
});