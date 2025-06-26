import { useEffect, useState, useMemo } from "react";
import { useData } from "vike-react/useData";

import { Data } from "./+data";
import { PublicCollection, Rec } from "../../../../utils/types";

import IndividualRec from "./Rec";
import Bio from "../components/Bio";
import ResultMessage from "../../../../layouts/components/ResultMessage";
import ScrollButton from "../../../../layouts/components/ScrollButton";
import Transition from "../components/Transition";
import PublicNav from "../components/Nav";

import type { RecResultOutput } from "../../../../store/api/public";

import "../../../../layouts/style.css";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useGetRecsInfiniteQuery } from "../../../../store/api/public";
import { useGetBookmarksQuery } from "../../../../store/api/profile";
import { active } from "../../../../store/slices/activeUser";
import { useMediaQuery } from "../../../../utils/mediaQuery";
import { useInfiniteScroll } from "../../../../utils/infiniteScroll";
import useColor from "../../../../utils/colors";

import { MagnifyingGlassIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

const Page = () => {
    const collection = useData<Data>();

    const dispatch = useAppDispatch()
    const isLG = useMediaQuery()

    const activeUser = useAppSelector((state) => state.activeUser.value)

    const highlight = useColor(collection ? collection.reader.highlight : "default")

    const { data, isError, isSuccess } = useGetBookmarksQuery()
 

    if (!collection) return null;


    return (
        <>
            <Transition />
            <div className="fixed right-5 md:right-15 lg:right-60 xl:right-80 bottom-10">
                <ScrollButton userHighlight={collection.reader.highlight} />
            </div>
            <div className={`min-h-screen ${collection.reader.highlight == "default" ? "bg-grave" : highlight.bg}`}>
                <PublicNav isSuccess={isSuccess} isError={isError} />
                <div className="flex justify-center">
                    <div className="lg:basis-1/3 w-full px-10 lg:px-0">
                        <Bio
                            avatar={collection.reader.avatar}
                            userHighlight={collection.reader.highlight}
                            username={collection.reader.username}
                            bio={collection.reader.bio}
                        />

                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="lg:basis-1/3 px-10 mt-10">
                        <h2 className={`text-xl ${highlight.contrast} text-center break-all`}>
                            {collection.name}
                        </h2>
                        {!collection.about &&
                            <p className={`${highlight.contrast} text-sm text-center mt-2 opacity-50`}>
                                {collection.about}
                            </p>
                        }
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="lg:basis-1/3 my-5 px-10 lg:px-0">
                        <Recs userData={data} collection={collection} />
                    </div>
                </div>
            </div>






            {/* <div className={`md:flex md:justify-center lg:relative
            ${collection.reader.highlight == "default" ? "bg-grave" : highlight.bg}    
            `}>
                
                <div className="lg:basis-1/3 md:basis-1/2">

                    {activeUser &&
                        <ResultMessage />
                    }
                    <div className="fixed bottom-20 right-5 lg:right-10 z-40">
                        <ScrollButton userHighlight={collection.reader.highlight} />
                    </div>

                    <div className="min-h-screen flex flex-col items-center px-5">
                        {!activeUser &&
                            <div className="flex pt-3 w-full justify-end">
                                <span className="text-primary">
                                    <a href="/login">
                                        [login]
                                    </a>
                                </span>
                            </div>
                        }
                        {isLoading &&
                        <ArrowPathIcon className="size-5 text-primary animate-spin" />
                        }
                        <div className="mt-[5dvh] w-full">
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
            </div> */}
        </>
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
            <div className="lg:flex justify-center">
                <div className="">
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