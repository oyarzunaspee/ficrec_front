import { useEffect } from "react";
import { usePageContext } from "vike-react/usePageContext";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { activeTab } from "../../store/slices/privacyTab";
import { activeTab as savedActiveTab } from "../../store/slices/savedTab";
import useColor from "../../utils/colors";
import { useMediaQuery } from "../../utils/mediaQuery";


const Tabs = () => {
    const dispatch = useAppDispatch()
    const { urlParsed } = usePageContext()
    const isLG = useMediaQuery()

    const savedTab = useAppSelector((state) => state.savedTab.value);
    const privacyTab = useAppSelector((state) => state.privacyTab.value);

    useEffect(() => {
        dispatch(activeTab(false))
    }, [])

    return (
        <>
            <div className="text-md w-full mt-2 px-5 bg-white font-medium text-center">
                <ul className="flex justify-center">
                    {(urlParsed.pathname == "/bookmarks" && !isLG) ?
                        <TabBase names={["Unread", "Read"]} active={savedTab} changeTab={savedActiveTab} />
                        :
                        <TabBase names={["Public", "Private"]} active={privacyTab} changeTab={activeTab} />
                    }
                </ul>
            </div>
        </>
    )

}


const TabBase = ({ names, active, changeTab }: { names: string[], active: boolean | null, changeTab: Function }) => {
    const dispatch = useAppDispatch()
    
    const highlight = useColor()

    return (
        <>

            <li
                className="basis-1/2"
                onClick={() => dispatch(changeTab(false))}
            >
                <span
                    className={`cursor-pointer rounded-t-lg inline-block p-2 w-full border-b-2
                    ${!active ? `active ${highlight.text}` : "text-primary border-transparent"}
                    `}
                >
                    {names[0]}
                </span>
            </li>
            <li
                className="basis-1/2"
                onClick={() => dispatch(changeTab(true))}
            >
                <span
                    className={`
                    cursor-pointer rounded-t-lg inline-block p-2 w-full border-b-2
                    ${active ? `active ${highlight.text}` : "text-primary border-transparent"}
                    `}
                >
                    {names[1]}
                </span>
            </li>
        </>
    )

}

export default Tabs;