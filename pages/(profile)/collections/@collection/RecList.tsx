import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useGetRecsInfiniteQuery } from "../../../../store/api/profile";
import { useState, useEffect, useRef, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useMediaQuery } from "../../../../store/hooks";
import { usePageContext } from "vike-react/usePageContext";
import Rec from "./Rec";
import { updateQuery } from "../../../../store/slices/query";
import useColor from "../../../../utils/colors";

const RecList = () => {
    const dispatch = useAppDispatch()
    const context = usePageContext();
    const highlight = useColor()
    const query = useAppSelector((state) => state.query.value);

    const isLG = useMediaQuery();

    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(0);

    const useQueryResult = useGetRecsInfiniteQuery({ uid: context.routeParams.collection, query: query })
    const { data, isFetching, fetchNextPage, refetch } = useQueryResult

    useEffect(() => {
        dispatch(updateQuery(""))
    }, [])

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

    useEffect(() => {
        refetch()
    }, [query])

    if (data) {
        return (
            <>
                {data.pages.map((result) => {
                    return result.results.map((rec) => {
                        return (
                            <Rec
                                key={rec.uid}
                                uid={rec.uid}
                                title={rec.title}
                                author={rec.author}
                                link={rec.link}
                                fandom={rec.fandom}
                                rating={rec.rating}
                                words={rec.words}
                                chapters={rec.chapters}
                                warnings={rec.warnings}
                                ship={rec.ship}
                                characters={rec.characters}
                                tags={rec.tags}
                                summary={rec.summary}
                                notes={rec.notes}
                            />

                        )
                    })
                })}
                {isFetching &&
                    <div className="flex justify-center py-5">
                        <ArrowPathIcon className="size-8 animate-spin text-gray-100" />
                    </div>
                }
            </>
        )
    }

}

export default RecList;