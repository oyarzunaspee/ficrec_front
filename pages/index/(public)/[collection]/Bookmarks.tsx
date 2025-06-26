import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useAddSavedMutation } from "../../../../store/api/profile";
import { close } from "../../../../store/slices/popup";
import { dispatchResult } from "../../../../utils/dispatchResult";
import { Bookmark } from "../../../../utils/types";
import { useMediaQuery } from "../../../../utils/mediaQuery";
import useColor from "../../../../utils/colors";

import { BookmarkIcon } from "@heroicons/react/24/solid";

type BookmarksProps = {
    username: string;
    collection: string;
    rec: string;
    userHighlight: string;
    userBookmarks?: Bookmark;
}

const Bookmarks = ({ username, collection, rec, userHighlight, userBookmarks }: BookmarksProps) => {
    const dispatch = useAppDispatch()
    const highlight = useColor(userHighlight)
    const isLG = useMediaQuery()

    const activeUser = useAppSelector((state) => state.activeUser.value)

    const [useAddSaved, result] = useAddSavedMutation()

    const performAddSaved = async () => {
        await useAddSaved({
            username: username,
            collection: collection,
            rec: rec
        })
    }

    useEffect(() => {
        if (result.isSuccess) {
            dispatch(close())
        }
    }, [result.isSuccess])

    dispatchResult({
        type: "Bookmark",
        action: "added",
        error: result.isError,
        success: result.isSuccess
    })

    return (
        <>
            {activeUser &&
                <div
                    className="flex justify-end">
                    <div className={`px-5 py-1
                    ${isLG ? "" : "cursor-pointer"}    
                    `}
                        onClick={isLG ? () => { } : performAddSaved}
                    >
                        <BookmarkIcon
                            title="Add to bookmarks"
                            onClick={!isLG ? () => { } : performAddSaved}
                            className={`size-6 lg:size-8
                        ${isLG ? "cursor-pointer" : ""}
                        ${(userBookmarks && userBookmarks.bookmarks.includes(rec)) ?
                                    highlight.text
                                    :
                                    "text-base"
                                }    
                    `} />

                    </div>
                </div>
            }
        </>
    )
}

export default Bookmarks;