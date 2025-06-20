import { useState, MouseEventHandler } from "react";

import Bookmarks from "./Bookmarks";

import type { Rec, Bookmark } from "../../../utils/types";

import { formatWords } from "../../../utils/formatWords";
import useColor from "../../../utils/colors";
import { useOutsideClick } from "../../../utils/outsideClick";

import parse from "html-react-parser";
import { ExclamationTriangleIcon, Bars3BottomLeftIcon, BookOpenIcon } from "@heroicons/react/24/outline";

type ShowProp = {
    fandom: boolean;
    warnings: boolean;
    characters: boolean;
    ship: boolean;
    tags: boolean;
}

type RecProps = {
    rec: Rec;
    userHighlight: string;
    show: ShowProp;
    collection: string;
    username: string;
    userBookmarks?: Bookmark;
}

const IndividualRec = ({ rec, userHighlight, show, collection, username, userBookmarks }: RecProps) => {
    const highlight = useColor(userHighlight)

    const optionals = Object.values(show).filter((v) => v).length

    const [open, setOpen] = useState<string | null>(null)

    const handleOpen = (name: string) => {
        if (open == name) {
            setOpen(null)
        } else {
            setOpen(name)
        }
    }
    return (
        <>
            <div key={rec.uid} className="card pb-7 pt-3 mb-5 relative">
                <Bookmarks
                    userHighlight={userHighlight}
                    username={username}
                    collection={collection}
                    rec={rec.uid}
                    userBookmarks={userBookmarks}
                />
                <div className="card-head
                        lg:px-10 md:px-5
                            ">
                    <div className="title ">
                        <div className="flex flex-col items-center">
                            <span >
                                <a className="underline text-center w-full text-grave" href={rec.link}>
                                    <h2 className="text-center">
                                        {rec.title}
                                    </h2>
                                </a>
                            </span>
                            <div className="mt-2">
                                <span className="text-dull text-sm font-normal">by </span>
                                {rec.author.map((item) => {
                                    return (
                                        <span key={item} className={`ml-1 font-normal text-sm not-last:after:content-[',']
                                        ${userHighlight == "default" ? "text-dull" : highlight.text}
                                        `}>
                                            {item}
                                        </span>
                                    )
                                })}
                            </div>

                        </div>
                        <div className="mt-3 flex justify-center items-end">
                            <ExclamationTriangleIcon className="size-4 text-dull" />
                            <span className="text-sm text-dull mx-1 font-normal">
                                {rec.rating}
                            </span>
                            <ExclamationTriangleIcon className="size-4 text-dull" />
                        </div>
                    </div>
                </div>
                <div className="card-body
                            lg:px-10 md:px-10
                            ">
                    {optionals > 1 &&
                        <div className="mb-4">
                            <div className="text-sm">
                            </div>
                            <ul className="flex justify-center">
                                {(Object.keys(show) as Array<keyof typeof show>).map((tag) => {
                                    return (
                                        <>
                                            {show[tag] &&
                                                <Optional
                                                    key={tag}
                                                    name={tag}
                                                    onClick={() => handleOpen(tag)}
                                                    open={open}
                                                    setOpen={setOpen}
                                                    userHighlight={userHighlight}
                                                />
                                            }
                                        </>
                                    )
                                })}
                            </ul>
                            <div className={`transition-height duration-200 ease-in-out
                            ${open ? "max-h-50 overflow-y-scroll" : "max-h-0 overflow-hidden"}
                            `}>
                                <ul className="bg-hover px-5 py-3 rounded-md mt-4">
                                    {open && (rec[open as keyof typeof rec] as Array<keyof typeof rec>).map((item) => {
                                        return (
                                            <li key={item} className="text-sm text-secondary not-last:mb-1">
                                                {item}
                                            </li>
                                        )
                                    })}
                                </ul>

                            </div>

                        </div>
                    }
                    {rec.summary ?
                        <div className="my-5 px-1 text-sm text-primary">
                            {parse(rec.summary)}
                        </div>
                        :
                        null
                    }
                    {rec.notes ?
                        <div className="text-primary rounded-md py-3 mt-4 text-sm bg-hover">
                            <div className="px-5">
                                <label className="font-bold">
                                    Notes:
                                </label>
                                <p className="mt-2 block whitespace-pre-wrap">
                                    {rec.notes}
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
                                    {formatWords(rec.words)}
                                    <small> words</small>
                                </span>
                            </div>
                        </div>
                        <div className="basis-1/2">
                            <div className="flex items-center justify-end">
                                <BookOpenIcon className="size-5 mr-1" />
                                <span>
                                    {rec.chapters}
                                    <small> chapters</small>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

type OptionalProps = {
    name: string;
    onClick: MouseEventHandler<HTMLLIElement>;
    open: string | null;
    setOpen: Function;
    userHighlight: string;
}

const Optional = ({ name, onClick, open, setOpen, userHighlight }: OptionalProps) => {
    const highlight = useColor(userHighlight)
    
    const ref = useOutsideClick(() => {
        setOpen(null)
    });

    return (
        <li
            key={name}
            className="not-last:border-r-2 border-base"
            onClick={onClick}
        >
            <div className="px-2 text-sm cursor-pointer">
                <span
                    ref={ref}
                    className={`border-b-2 border-dotted pb-0.5
                ${highlight.hoverBorder}
                ${open == name ? `${highlight.border} ${highlight.text}` : "border-dull"}
                `}>
                    {name}
                </span>
            </div>
        </li>
    )
}

export default IndividualRec;