import { useMemo, useEffect, useState } from "react";

type Props = {
    data: any;
    isFetching: any; 
    fetchNextPage: any; 
    refetch: any;
    query?: string;
    setSkip?: Function;
    skip?: boolean;
}

export const useInfiniteScroll = ({data, isFetching, fetchNextPage, refetch, query, setSkip, skip}: Props) => {

    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);


    useMemo(() => {
        if (data) {
            const lastPageParam = data.pageParams.at(-1);
            if (lastPageParam !== undefined) {
                setCurrentPage(lastPageParam);
            }
            if (data.pages.length > 0) {
                setTotal(typeof data.pages?.[0].pages == "number" ? data.pages?.[0].pages : 0);
            }
            if (setSkip) {
                setSkip(skip)
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
        if (query && query.length > 2) {
            refetch()
        }
    }, [query])

    return { total, currentPage }
}