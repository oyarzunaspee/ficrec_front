import { useEffect, useState, useMemo } from "react";
import { useData } from "vike-react/useData";
import { navigate } from "vike/client/router";

import { Data } from "./+data";
import IndividualRec from "./Rec";
import Bio from "../components/Bio";
import ResultMessage from "../../../../layouts/components/ResultMessage";
import useColor from "../../../../utils/colors";
import ScrollButton from "../../../../layouts/components/ScrollButton";

import { PublicCollection, Rec } from "../../../../utils/types";
import type { RecResultOutput } from "../../../../store/api/public";

import "../../../../layouts/style.css";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useGetRecsInfiniteQuery } from "../../../../store/api/public";
import { useGetBookmarksQuery } from "../../../../store/api/profile";
import { active } from "../../../../store/slices/activeUser";
import { useMediaQuery } from "../../../../utils/mediaQuery";
import { useInfiniteScroll } from "../../../../utils/infiniteScroll";

import { MagnifyingGlassIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

const Page = () => {
    const collection = useData<Data>();

    const dispatch = useAppDispatch()
    const isLG = useMediaQuery()

    const highlight = useColor(collection ? collection.reader.highlight : "default")

    const activeUser = useAppSelector((state) => state.activeUser.value)



    const { data, isError, isSuccess, isLoading } = useGetBookmarksQuery()

    useEffect(() => {
        if (isSuccess) {
            dispatch(active())
        }
    }, [isSuccess])

    if (!collection) return null;

    const [scroll, setScroll] = useState<boolean>(false);

    const handleScroll = () => {
        const position = window.pageYOffset;

        if (position > 300) {
            setScroll(true);
        } else if (position < 300) {
            setScroll(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);


    return (
        <>
            <div className="md:flex md:bg-base md:justify-center lg:relative">
                {(isLG && scroll) &&
                    <div className="fixed left-[8em] top-[10dmh]">
                        <div className="flex justify-center">
                            <div className="card w-[15dvw] flex flex-col items-center text-wrap p-5 mt-30">
                                <img src={collection.reader.avatar}
                                    onClick={() => navigate(`/@${collection.reader.username}`)}
                                    className=" h-[15dvh] aspect-square left-0 rounded-full shadow cursor-pointer object-cover" />
                                <h2 className={`font-bold text-lg mt-5 break-all text-center
                                    ${highlight.text}   
                                    `}>
                                    @{collection.reader.username}
                                </h2>
                                <p className="text-primary text-sm text-center">
                                    {collection.reader.bio}
                                </p>
                                <div className="pt-2 mt-3 border-t border-base">
                                    <h3 className="text-center font-bold text-sm text-grave">
                                        {collection.name}
                                    </h3>
                                    <p className="text-sm text-primary mt-1">
                                        {collection.about}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {!isLG &&
                    <ScrollBio scroll={scroll} highlight={highlight.text} name={collection.name} />
                }
                <div className="lg:basis-1/3 md:basis-1/2">

                    {activeUser &&
                        <ResultMessage />
                    }
                    <div className="fixed bottom-20 right-5 lg:right-10 z-40">
                        <ScrollButton highlight={highlight.bg} />
                    </div>

                    <div className="min-h-screen bg-base flex flex-col items-center px-5">
                        {!activeUser &&
                            <div className="flex pt-3 w-full justify-end">
                                <span className="text-primary">
                                    <a href="/login">
                                        [login]
                                    </a>
                                </span>
                            </div>
                        }
                        <div className="mt-[5dvh] w-full">
                            <div className={`overflow-hidden transition-height duration-300 ease-in-out
                            ${scroll ? "max-h-0" : "max-h-100"}
                            lg:max-h-100
                            `}>
                                <Bio
                                    avatar={collection.reader.avatar}
                                    username={collection.reader.username}
                                    userHighlight={collection.reader.highlight}
                                    bio={collection.reader.bio}
                                />
                            </div>
                            <div className="my-10">
                                <h2 className="text-center font-bold text-grave text-xl">
                                    {collection.name}
                                </h2>
                                <p className="text-center text-primary text-sm mt-2">
                                    {collection.about}
                                </p>
                            </div>
                            <Recs userData={data} collection={collection} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const ScrollBio = ({ scroll, name, highlight }: { scroll: boolean, name: string, highlight: string }) => {
    return (

        <div className={`fixed z-40 w-full
        overflow-hidden transition-height duration-300 ease-in-out
        ${scroll ? "max-h-40 shadow" : "max-h-0"}
        `}>
            <div className="bg-white break-all flex items-center justify-center w-full py-3">
                <h2 className={`font-bold text-lg ${highlight}`}>
                    {name}
                </h2>
            </div>
        </div>

    )
}

const Recs = ({ userData, collection }: { userData?: { bookmarks: string[] }, collection: PublicCollection }) => {
    const [query, setQuery] = useState<string>("")

    const show = {
        fandom: collection.fandom,
        warnings: collection.warnings,
        characters: collection.characters,
        ship: collection.ship,
        tags: collection.tags,
    }

    const useQueryResult = useGetRecsInfiniteQuery({
        username: collection.reader.username,
        uid: collection.uid,
        query: query
    })
    const { data, isFetching, fetchNextPage, refetch } = useQueryResult

    const { total, currentPage } = useInfiniteScroll({
        data: data,
        isFetching: isFetching,
        fetchNextPage: fetchNextPage,
        refetch: refetch,
        query: query
    })


    if (!data) return null;

    return (
        <>
            <div className="flex justify-center">
                <div className="basis-2/3">
                    <div className="mb-5">
                        <div className="form-group relative">
                            <div className="absolute inset-y-0 end-5 flex items-center ps-3.5 pointer-events-none">
                                <MagnifyingGlassIcon className="size-4 text-primary" />
                            </div>
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                type="search" className="pl-5 pr-10 placeholder:text-dull" placeholder="Filter recs" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                {data.pages.map((result) => {
                    return result.results.map((rec: Rec) => {
                        return (
                            <IndividualRec
                                key={rec.uid}
                                rec={rec}
                                userHighlight={collection.reader.highlight}
                                show={show}
                                username={collection.reader.username}
                                collection={collection.uid}
                                userBookmarks={userData}
                            />
                        )
                    })
                })}
                {isFetching &&
                    <div className="flex justify-center py-5">
                        <ArrowPathIcon className="size-8 animate-spin text-gray-100" />
                    </div>
                }
            </div>
        </>
    )

}


export default Page;