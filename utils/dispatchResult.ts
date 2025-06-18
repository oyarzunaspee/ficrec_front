import { useEffect } from "react";
import { setResultMessage } from "../store/slices/resultMessage";
import { useAppDispatch } from "../store/hooks";


export const dispatchResult = ({type, action, error, success} : {type: string, action: string, error?: boolean, success?: boolean}) => {
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

}