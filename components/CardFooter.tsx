import { MouseEventHandler } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useAppSelector } from "../store/hooks";
import useColor from "../utils/colors";

import { ArrowPathIcon } from "@heroicons/react/24/solid";

type CardFooterProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    error?: FetchBaseQueryError | SerializedError;
    isLoading?: boolean;
    button?: string;
    disabled?: boolean;
}

function CardFooter({ onClick, error, isLoading, button, disabled }: CardFooterProps) {
    const highlight = useColor()
    
    const userHighlight = useAppSelector((state) => state.highlight.value);

    return (
        <>
            <div className="card-footer pb-5">
                <button 
                type={!onClick ? "submit" : "button"}
                onClick={onClick ? onClick : () => {}}
                disabled={disabled}
                className={`disabled:bg-base disabled:cursor-not-allowed
                    ${button == "DELETE" ? "bg-error" : (userHighlight != "default" ? highlight.bg : "bg-grave")}`}
                >
                    {isLoading ?
                        <ArrowPathIcon className="icon-spin" />
                        :
                        (button ? button : "SAVE")
                    }
                </button>
            </div>
        </>
    )
}

export default CardFooter;