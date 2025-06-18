import { useState, useEffect, useMemo } from "react";
import useColor from "../../../utils/colors";
import { useAppDispatch } from "../../../store/hooks";
import { updateQuery } from "../../../store/slices/query";
// import { useLazyGetFindRecsQuery } from "../../../store/api/profile";
import { useGetFindRecsInfiniteQuery } from "../../../store/api/public";
import type { UserCollection } from "../../../utils/types";

const Page = () => {
    const dispatch = useAppDispatch()
    const highlight = useColor()
    const [skip, setSkip] = useState<boolean>(true)
    const [activeSearch, setActiveSearch] = useState<string>("")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [tagsSearch, setTagsSearch] = useState<string>("")
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [openTags, setOpenTags] = useState<boolean>(false);

    const options = ["fandom", "ship", "author", "link"]

    const useQueryResult = useGetFindRecsInfiniteQuery({ type: activeSearch, query: searchQuery, tags: tagsSearch }, { skip: skip })
    const { data, isFetching, fetchNextPage, refetch } = useQueryResult

    useMemo(() => {
        if (data) {
            const lastPageParam = data.pageParams.at(-1);
            if (lastPageParam !== undefined) {
                setCurrentPage(lastPageParam);
            }
            if (data.pages.length > 0) {
                setTotal(data.pages[0].pages);
            }

        }
    }, [data])


    const handleScroll = () => {

        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && !isFetching) {
            if (currentPage < total) {
                fetchNextPage();
            }

        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [data]);

    // useEffect(() => {
    //     if (searchQuery.length > 2 && activeSearch != "") {
    //         refetch()
    //     }
    // }, [searchQuery, activeSearch])

    // const [trigger, result, lastPromiseInfo] = useLazyGetFindRecsQuery()


    // const performSearch = () => {
    //     if (activeSearch != "" && searchQuery.length > 2) {
    //         trigger({ data: {query: searchQuery.split(",")}, page: currentPage, type: activeSearch })
    //     }
    // }

    // const nextPage = () => {
    //     if (activeSearch != "" && searchQuery.length > 2) {
    //         trigger({ data: {query: searchQuery.split(",")}, page: currentPage, type: activeSearch })
    //     }
    // }

    // useEffect(() => {
    //     setCurrentPage(1)
    // }, [activeSearch])

    // useEffect(() => {
    //     setCurrentPage(1)
    // }, [searchQuery])

    // useEffect(() => {
    //     if (activeSearch != "" && searchQuery.length > 2) {
    //         setDisabled(false)
    //     } else if (activeSearch == "" || searchQuery.length < 1) {
    //         setDisabled(true)
    //     }
    // }, [activeSearch, searchQuery])

    const performSearch = () => {
        // setSkip(false)
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
                <div className={`transition-height duration-300 ease-in-out overflow-hidden
                ${openTags ? "max-h-100" : "max-h-0"}
                `}>
                    <div className="form-group">
                        <span className={`text-xs mb-1
                            ${activeSearch == "link" ? "text-base" : "text-primary" }
                        `}>
                            Separate tags by comma
                        </span>
                        <input
                            value={tagsSearch}
                            onChange={(e) => setTagsSearch(e.target.value)}
                            disabled={activeSearch == "link"}
                            type="search" name="" id=""
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
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            // disabled={disabled}
                            onClick={performSearch}
                            className="bg-primary disabled:bg-base disabled:cursor-default">
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
                    {data.results.map((item: UserCollection) => {
                        return (
                            <div className="card">
                                {item.name}
                            </div>
                        )
                    })}
                </>
                :
                null
            }
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

export default Page;