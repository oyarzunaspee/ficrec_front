import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { resetResultMessage, initResetResultMessage } from "../../store/slices/resultMessage";
import useColor from "../../utils/colors";

import { SparklesIcon, NoSymbolIcon } from "@heroicons/react/24/solid";

const ResultMessage = () => {
    const dispatch = useAppDispatch();
    const highlight = useColor()

    const result = useAppSelector((state) => state.resultMessage.value)

    // const result = {
    //     visible: true,
    //     success: true,
    //     type: "Collection",
    //     action: "created"
    // }

    useEffect(() => {
        if (result.visible) {
            const timer = setTimeout(() => {
                dispatch(initResetResultMessage())
            }, 4000);
            
            return () => clearTimeout(timer);
        }
        if (!result.visible) {
            const timer = setTimeout(() => {
                dispatch(resetResultMessage())
            }, 302);
            return () => clearTimeout(timer);
        }
    }, [result.visible])


    return (
        <>
            <div className={`fixed lg:bottom-17 lg:w-fit
            bottom-10 w-full top-auto right-auto
            transition-opacity duration-300 ease-in-out
            ${result.visible ? "h-fit opacity-100 z-30" : "h-0 opacity-0 z-0"}
            `}>
                <div className="flex justify-center
                lg:flex-none
                ">
                    <div className={`z-30 border-dashed border-2 rounded-md px-5 py-2
                ${result.success ? highlight.pale: "bg-red-200"}
                ${result.success ? highlight.border : "border-red-400"}
                ${result.visible ? "block" : "hidden"}
                `}>
                        <h2 className={`flex lg:text-xl text-lg
                    ${result.success ? highlight.text + " items-start" : "text-red-800 items-center"}`}
                        >
                            {result.success ?
                                <SparklesIcon className="size-5 mr-2" />
                                :
                                <NoSymbolIcon className="size-5 mr-2 " />
                            }
                            <span>
                                {result.type}
                                {result.success ?
                                    " " + result.action + " successfully"
                                    :
                                    " could not be " + result.action
                                }
                            </span>
                            
                        </h2>
                    </div>
                </div>
            </div>
        </>
    )
}

    export default ResultMessage;