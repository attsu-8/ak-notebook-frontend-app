import type { VFC } from "react";
import { MemoSubmitButton } from "../commons/button/memo-submit-button";

interface NewNoteButtonProps {
    formId: string;
}

export const NewNoteButton: VFC<NewNoteButtonProps> = (props) => {
    const { formId, ...other} = props;
    
    return(
        <MemoSubmitButton
            toolTipTitle="submit"
            form={formId}
        >
            <>
                New
            </>
       </MemoSubmitButton>

    )
}
