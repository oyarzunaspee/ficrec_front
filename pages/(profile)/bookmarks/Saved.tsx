import { useState } from "react";

import CardFooter from "../../../components/CardFooter";
import Popup from "../../../components/Popup";
import Dropdown from "../../../components/Dropdown";

import type { Saved } from "../../../utils/types";

import { useDeleteSavedMutation, useMarkAsReadMutation } from "../../../store/api/profile";
import { useOutsideClick } from "../../../utils/outsideClick";
import { formatWords } from "../../../utils/formatWords";
import { dispatchResult } from "../../../utils/dispatchResult";
import { useMediaQuery } from "../../../utils/mediaQuery";
import useColor from "../../../utils/colors";

import { XCircleIcon } from "@heroicons/react/24/solid";
import {
    ExclamationTriangleIcon,
    Bars3BottomLeftIcon,
    BookOpenIcon,
    ChevronDoubleRightIcon,
    EllipsisVerticalIcon,
    CheckIcon,
    TrashIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";

const IndividualSaved = ({ saved }: { saved: Saved }) => {
    const highlight = useColor()

    const [deleteBookmark, setDeleteBookmark] = useState<boolean>(false)
    const [dropdown, setDropdown] = useState<boolean>(false);

    return (
        <div key={saved.uid} className="card pb-7 pt-3 mb-5 relative">
            <div
                className="flex px-5 justify-end pt-1"
                onClick={!deleteBookmark ?
                    () => setDropdown(true)
                    :
                    () => setDeleteBookmark(false)
                }
            >
                <div className="cursor-pointer pl-5">
                    {!deleteBookmark ?
                        <EllipsisVerticalIcon className="size-6 text-primary" />
                        :
                        <XCircleIcon className="size-6 text-primary" />
                    }

                </div>

                <Menu
                    dropdown={dropdown}
                    setDropdown={setDropdown}
                    setDeleteBookmark={setDeleteBookmark}
                    uid={saved.uid}
                    read={saved.read}
                />
            </div>
            <div className="card-head py-0
             lg:px-10 md:px-5 lg:relative
             ">
                <div className="title">
                    <div className="flex flex-col items-center">
                        <span >
                            <a className="underline text-center w-full text-grave" href={saved.rec.link}>
                                <h2 className="text-center">
                                    {saved.rec.title}
                                </h2>
                            </a>
                        </span>
                        <div className="mt-2">
                            <span className="text-dull text-sm font-normal">by </span>
                            {saved.rec.author.map((item) => {
                                return (
                                    <span key={item} className={`ml-1 font-normal text-sm not-last:after:content-[',']
                                        ${highlight.text}
                                        `}>
                                        {item}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                    {!deleteBookmark &&
                        <div className="mt-3 flex justify-center items-end">
                            <ExclamationTriangleIcon className="size-4 text-dull" />
                            <span className="text-sm text-dull mx-1 font-normal">
                                {saved.rec.rating}
                            </span>
                            <ExclamationTriangleIcon className="size-4 text-dull" />
                        </div>
                    }
                </div>
            </div>
            {!deleteBookmark &&
                <div className="card-body
                    lg:px-10 md:px-10
                ">
                    {saved.rec.notes ?
                        <div className="text-primary rounded-md py-3 mt-4 text-sm bg-hover">
                            <div className="px-5">
                                <label className="font-bold">
                                    Notes:
                                </label>
                                <p className="mt-2 block whitespace-pre-wrap">
                                    {saved.rec.notes}
                                </p>
                            </div>
                        </div>
                        :
                        null
                    }
                    <div className="flex text-sm text-dull items-center mt-5">
                        <div className="basis-1/2">
                            <div className="flex items-center">
                                <Bars3BottomLeftIcon className="size-5" />
                                <span>
                                    {formatWords(saved.rec.words)}
                                    <small> words</small>
                                </span>
                            </div>
                        </div>
                        <div className="basis-1/2">
                            <div className="flex items-center justify-end">
                                <BookOpenIcon className="size-5 mr-1" />
                                <span>
                                    {saved.rec.chapters}
                                    <small> chapters</small>
                                </span>
                            </div>
                        </div>
                    </div>
                    <a
                        href={`/@${saved.maker}/${saved.collection.uid}`}
                        className="text-sm border-t border-dashed border-base pt-5 mt-3 flex justify-between items-center cursor-pointer"
                    >
                        <div>
                            <span className="text-primary">
                                From:
                            </span>
                            <span className="ml-1 italic text-grave">
                                {saved.collection.name}
                            </span>
                            <span className="text-primary mx-1">
                                by
                            </span>
                            <span className="italic text-grave">
                                {saved.maker}
                            </span>
                        </div>
                        <div className="shrink-1">
                            <ChevronDoubleRightIcon className={`size-4 ${highlight.text}`} />
                        </div>
                    </a>
                </div>
            }
            <DeleteBookmark
                deleteBookmark={deleteBookmark}
                setDeleteBookmark={setDeleteBookmark}
                title={saved.rec.title}
                uid={saved.uid}
            />
        </div >
    )
}

type MenuProps = { 
    setDeleteBookmark: Function;
    dropdown: boolean;
    setDropdown: Function;
    uid: string;
    read: boolean;
}

const Menu = ({ setDeleteBookmark, dropdown, setDropdown, uid, read }: MenuProps) => {
    
    const [useMarkAsRead, result] = useMarkAsReadMutation()

    const items = [
        {
            title: read ? "Mark as unread" : "Mark as read",
            Icon: read ? XMarkIcon : CheckIcon,
            click: () => {
                useMarkAsRead(uid)
                .unwrap()
                .then(() => setDropdown(false))
            }
        },
        {
            title: "Delete",
            Icon: TrashIcon,
            click: async () => {
                await setDeleteBookmark(true);
                setDropdown(false);
            }
        }
    ]

    const handleClickOutside = () => {
        setDropdown(false);
    };


    const ref = useOutsideClick(handleClickOutside);

    return (
        <Dropdown
            right="lg:right-6"
            top="lg:top-10"
            ref={ref}
            open={dropdown}
            items={items}
        />
    )
}

const DeleteBookmark = ({ deleteBookmark, setDeleteBookmark, title, uid }: { deleteBookmark: boolean, setDeleteBookmark: Function, title: string, uid: string }) => {
    const isLG = useMediaQuery();

    const [useDeleteSaved, result] = useDeleteSavedMutation()

    const performDelete = async () => {
        await useDeleteSaved(uid)
            .unwrap()
            .then(() => {
                setDeleteBookmark(false)
            })
    }

    dispatchResult({
        type: "Bookmark",
        action: "deleted",
        error: result.isError,
        success: result.isSuccess
    })

    const ref = useOutsideClick(() => {
        setDeleteBookmark(false);
    });

    const body = (
        <>
            <div className="content">
                <h3>
                    Delete <span className="italic font-bold text-error">
                        {title}
                    </span>
                    ?
                </h3>
            </div>
            <CardFooter
                error={result.error}
                onClick={performDelete}
                isLoading={result.isLoading}
                button="DELETE"
            />
        </>
    )

    return (
        <>
            {(isLG && deleteBookmark) ?
                <>
                    {deleteBookmark &&
                        <>
                            <div className="screen"></div>
                            <Popup
                                ref={ref}
                                title="Delete bookmark"
                                open={deleteBookmark}
                                setOpen={setDeleteBookmark}
                                body={body}
                            />
                        </>
                    }
                </>
                :
                <div className={`transition-height duration-200 ease-in-out overflow-hidden
                    ${deleteBookmark ? "max-h-50" : "max-h-0"}
                    `}>
                    <div className="px-5 mt-5">
                        <CardFooter
                            error={result.error}
                            onClick={performDelete}
                            isLoading={result.isLoading}
                            button="DELETE"
                        />
                    </div>
                </div>
            }
        </>
    )
}

export default IndividualSaved;