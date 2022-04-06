import type { VFC } from "react";
import { useSelector } from "react-redux";
import { selectEditPurpose } from "../../../slices/memo/purposeSlice";
import { MemoSubmitButton } from "../commons/button/memo-submit-button";

interface DeletePurposeButtonProps {
    formId: string;
    onClick: (purposeId:string)=>void;
}

export const DeletePurposeButton: VFC<DeletePurposeButtonProps> = (props) => {
    const { formId, onClick, ...other} = props;
    const editPurpose: any = useSelector(selectEditPurpose);

    return(
        <MemoSubmitButton
            toolTipTitle="submit"
            form={formId}
            onClick={() => onClick(editPurpose.purposeId)}
        >
            <>
                Delete
            </>
       </MemoSubmitButton>

    )
}
