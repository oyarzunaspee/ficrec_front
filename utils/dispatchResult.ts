import { useEffect } from "react";
import { setResultMessage } from "../store/slices/resultMessage";
import { useAppDispatch, useAppSelector } from "../store/hooks";


type Props = {
    type: string;
    action: string;
    error?: boolean;
    success?: boolean;
    extra?: Function;
    param?: any;
}

export const dispatchResult = ({type, action, error, success, extra, param} : Props) => {
    const result = useAppSelector((state) => state.resultMessage.value.visible)
    const dispatch = useAppDispatch();

        useEffect(() => {
            if (error) {
                dispatch(setResultMessage({
                    success: false,
                    type: type,
                    action: action
                }))
            }
        }, [error])

        useEffect(() => {
            if (success) {
                dispatch(setResultMessage({
                    success: true,
                    type: type,
                    action: action
                }))
            }
        }, [success])

        useEffect(() => {
            if (extra && !result) {
                extra(param)
            }
        }, [result])

}