import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { useAddSavedMutation } from "../../../store/api/profile";
import { useEffect } from "react";
import { Bookmark } from "../../../utils/types";
import { useMediaQuery } from "../../../store/hooks";
import { close } from "../../../store/slices/popup";
import { dispatchResult } from "../../../utils/dispatchResult";

type BookmarksProps = {
    username: string;
    collection: string;
    rec: string;
    highlight?: string;
    userBookmarks?: Bookmark;
}

const Bookmarks = ({ username, collection, rec, highlight, userBookmarks }: BookmarksProps) => {
    const dispatch = useAppDispatch()
    const activeUser = useAppSelector((state) => state.activeUser.value)

    const isLG = useMediaQuery()

    const [performAddBookmark, result] = useAddSavedMutation()

    const addBookmark = async () => {
        performAddBookmark({
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
                        onClick={isLG ? () => { } : addBookmark}
                    >
                        <BookmarkIcon
                            title="Add to bookmarks"
                            onClick={!isLG ? () => { } : addBookmark}
                            className={`size-5
                        ${isLG ? "cursor-pointer" : ""}
                        ${(userBookmarks && userBookmarks.bookmarks.includes(rec)) ?
                                    "text-" + highlight
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