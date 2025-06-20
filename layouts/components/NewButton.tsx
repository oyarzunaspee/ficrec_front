import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { open } from "../../store/slices/popup";
import useColor from "../../utils/colors";

import { PlusCircleIcon } from "@heroicons/react/24/solid";

const NewButton = () => {
    const dispatch = useAppDispatch();
    const { routeParams, urlParsed} = usePageContext();
    const highlight = useColor()

    const userHighlight = useAppSelector((state) => state.highlight.value)

    const navigateNew = () => {
        if (urlParsed.pathname == "/") {
            navigate("/new")
        } else {
            navigate("/recs/new")
        }
    }

    if (urlParsed.pathname == "/" || urlParsed.pathname == `/collections/${routeParams.collection}`) {
        return (
            <>
                <div className="lg:block hidden">
                    <button className="cursor-pointer" onClick={() => dispatch(open(urlParsed.pathname == "/" ? "collection" : "rec"))}>
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