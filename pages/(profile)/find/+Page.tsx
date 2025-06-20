import { useState, useEffect } from "react";

import Loading from "../../../components/Loading";

import type { FindQuery } from "../../../utils/types";

import { useAppSelector } from "../../../store/hooks";
import { useGetFindRecsInfiniteQuery } from "../../../store/api/public";
import useColor from "../../../utils/colors";
import { useInfiniteScroll } from "../../../utils/infiniteScroll";

import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

const Page = () => {
    const userHighlight = useAppSelector((state) => state.highlight.value)
    const highlight = useColor()

    const [skip, setSkip] = useState<boolean>(true)
    const [activeSearch, setActiveSearch] = useState<string>("")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [tagsSearch, setTagsSearch] = useState<string>("")
    const [disabled, setDisabled] = useState<boolean>(true);
    const [openTags, setOpenTags] = useState<boolean>(false);

    const options = ["fandom", "ship", "author", "link"]

    const useQueryResult = useGetFindRecsInfiniteQuery({ type: activeSearch, query: searchQuery, tags: tagsSearch }, { skip: skip })
    const { data, isFetching, fetchNextPage, refetch } = useQueryResult

    const { total, currentPage } = useInfiniteScroll({
        data: data,
        isFetching: isFetching,
        fetchNextPage: fetchNextPage,
        refetch: refetch,
        setSkip: setSkip,
        skip: skip
    })

    useEffect(() => {
        if (activeSearch != "" && searchQuery.length > 2) {
            setDisabled(false)
        } else if (activeSearch == "" || searchQuery.length < 3) {
            setDisabled(true)
        }
    }, [activeSearch, searchQuery])

    const performSearch = () => {
        setSkip(false)
    }

    return (
        <>
            <div className="card p-5">
                <div
                    onClick={() => setOpenTags(!openTags)}
                    className={`underline mb-4 flex justify-end text-sm cursor-default
                    ${highlight.hover} ${!openTags ? highlight.text : "text-primary"}
                    `}
                >
                    {openTags ?
                        "- Remove tags"
                        :
                        "+ Add tags"
                    }
                </div>
                <div className={`transition-height duration-300 ease-in-out
                ${openTags ? "max-h-100" : "max-h-0 overflow-hidden"}
                `}>
                    <div className="form-group">
                        <span className={`text-xs mb-1
                            ${activeSearch == "link" ? "text-base" : "text-primary"}
                        `}>
                            Separate tags by comma
                        </span>
                        <input
                            value={tagsSearch}
                            onChange={(e) => setTagsSearch(e.target.value.replace(", ", ","))}
                            disabled={activeSearch == "link"}
                            type="search" name="" id=""
                            className={`${highlight.focus} ${highlight.caret}`}
                        />
                    </div>

                </div>
                <div className="form-group">

                    <span className="text-xs text-primary mb-1 block">
                        {(activeSearch && activeSearch != "link") &&
                            <>
                                Separate
                                {activeSearch == "ship" &&
                                    " characters "
                                }
                                {activeSearch == "fandom" &&
                                    " fandoms "
                                }
                                {activeSearch == "author" &&
                                    " authors "
                                }
                                by comma
                            </>
                        }
                    </span>
                    <div className="single">
                        <input
                            type="search"
                            value={searchQuery}
                            className={`${highlight.focus} ${highlight.caret}`}
                            onChange={(e) => setSearchQuery(e.target.value.replace(", ", ","))}
                        />
                        <button
                            disabled={disabled}
                            onClick={performSearch}
                            className={`disabled:bg-base disabled:cursor-default
                            ${userHighlight == "default" ? "bg-secondary" : highlight.bg}
                            `}>
                            SEARCH
                        </button>
                    </div>
                </div>
                <div className="flex justify-around mt-5">
                    {options.map((item) => {
                        return (
                            <RadioOptions
                                key={item}
                                name={item}
                                activeSearch={activeSearch}
                                setActiveSearch={setActiveSearch}
                            />
                        )
                    })}
                </div>

            </div>

            {data ?
                <>
                    {data.pages.map((result) => {
                        return result.results.map((item: FindQuery) => {
                            return (
                                <FoundCollection
                                    name={item.name}
                                    about={item.about}
                                    uid={item.uid}
                                    maker={item.maker}
                                    matching_recs={item.matching_recs}
                                />
                            )
                        })
                    })
                    }
                    {isFetching ?
                        <Loading />
                        :
                        null
                    }
                </>
                :
                null}
        </>
    )
}


const RadioOptions = ({ name, activeSearch, setActiveSearch }: { name: string, activeSearch: string, setActiveSearch: Function }) => {
    const highlight = useColor()

    return (
        <div key={name} className="flex items-center me-4">
            <input
                checked={activeSearch == name}
                onChange={() => setActiveSearch(name)}
                type="radio"
                className={`w-4 h-4 ${highlight.border}`}
            />
            <label htmlFor="" className="ml-2 text-sm text-secondary">
                {name}
            </label>
        </div>
    )
}

const FoundCollection = ({ name, about, uid, maker, matching_recs }: FindQuery) => {
    const highlight = useColor()
    return (
        <div className="mt-10">
            <div className="card">
                <div className="border-b border-dashed border-base">
                    <a
                        href={`/@${maker}/${uid}`}
                        title="Go to collection"
                        className={`px-5 pt-5 pb-2 flex justify-between
                        ${highlight.hover} text-primary
                        `}
                    >
                        <span>
                            {matching_recs} recs
                        </span>
                        <div className="pl-5 shrink-0">
                            <ChevronDoubleRightIcon className="size-5" />
                        </div>
                    </a>

                </div>
                <div className="p-5">
                    <div className="flex">
                        <h2 className="text-grave">
                            <span className={`shrink-0 font-bold ${highlight.text}`}>
                                {maker}
                            </span>
                            <span className="text-primary mx-1 font-bold">
                                |
                            </span>
                            {name}
                        </h2>
                    </div>
                    {about &&
                        <div className="mt-2">
                            <p className="text-primary text-sm">
                                {about}
                            </p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Page;