import { useEffect } from "react";
import { usePageContext } from "vike-react/usePageContext";

import IndividualRec from "./Rec";
import Loading from "../../../../../components/Loading";

import type { Rec } from "../../../../../utils/types";

import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { useGetRecsInfiniteQuery } from "../../../../../store/api/profile";
import { updateQuery } from "../../../../../store/slices/query";
import { useInfiniteScroll } from "../../../../../utils/infiniteScroll";

const RecList = () => {
    const dispatch = useAppDispatch()
    const { routeParams } = usePageContext();

    const query = useAppSelector((state) => state.query.value);

    const useQueryResult = useGetRecsInfiniteQuery({ uid: routeParams.collection, query: query })
    const { data, isFetching, fetchNextPage, refetch } = useQueryResult

    useEffect(() => {
        dispatch(updateQuery(""))
    }, [])

    const { total, currentPage } = useInfiniteScroll({
        data: data,
        isFetching: isFetching,
        fetchNextPage: fetchNextPage,
        refetch: refetch,
        query: query
    })


    if (data) {
        return (
            <>
                {data.pages.map((page) => {
                    return page.results.map((rec: Rec) => {
                        return (
                            <IndividualRec
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
                {isFetching ?
                    <Loading />
                    :
                    null
                }
            </>
        )
    }

}

export default RecList;