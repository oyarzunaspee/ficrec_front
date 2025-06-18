import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { open } from "../../store/slices/popup";
import { navigate } from "vike/client/router";
import useColor from "../../utils/colors";

const NewButton = () => {
    const dispatch = useAppDispatch();

    const context = usePageContext();
    const collection = context.routeParams.collection
    const path = context.urlParsed.pathname

    const userHighlight = useAppSelector((state) => state.highlight.value)
    const highlight = useColor()

    const navigateNew = () => {
        if (path == "/") {
            navigate("/new")
        } else {
            navigate("/recs/new")
        }
    }

    if (path == "/" || path == `/collections/${collection}`) {
        return (
            <>
                <div className="lg:block hidden">
                    <button className="cursor-pointer" onClick={() => dispatch(open(path == "/" ? "collection" : "rec"))}>
                        <PlusCircleIcon className={`size-12 border-3 rounded-full bg-white
                                        ${userHighlight != "default" ? highlight.text + " " + highlight.border : "text-grave"}
                                        `} />
                    </button>
                </div>
                <div className="lg:hidden block">
                    <button
                        onClick={navigateNew}
                        className="cursor-pointer">
                        <PlusCircleIcon className={`size-12 border-3 rounded-full bg-white
                                        ${userHighlight != "default" ? highlight.text + " " + highlight.border : "text-grave"}
                                        `} />
                    </button>
                </div>
            </>
        )
    }
}

export default NewButton;