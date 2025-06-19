import { useGetSavedInfiniteQuery } from "../../../store/api/profile";
import { useState, useEffect, useMemo, ChangeEventHandler } from "react";
import { useAppDispatch, useAppSelector, useMediaQuery } from "../../../store/hooks";
import { updateQuery } from "../../../store/slices/query";
import type { Saved } from "../../../utils/types";
import useColor from "../../../utils/colors";
import IndividualSaved from "./Saved";
import { activeTab } from "../../../store/slices/savedTab";
import Loading from "../../../components/Loading";

const Bookmarks = () => {
    const dispatch = useAppDispatch()
    const query = useAppSelector((state) => state.query.value);

    const savedTab = useAppSelector((state) => state.savedTab.value)

    const isLG = useMediaQuery()

    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(0);

    const useQueryResult = useGetSavedInfiniteQuery({ query: query })
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

    if (!data) return null;

    return (
        <>
            {isLG &&
                <div className="flex py-10 justify-around">
                    <RadioType
                        checkedValue={savedTab == null}
                        name="All"
                        setChange={() => dispatch(activeTab(null))}
                    />
                    <RadioType
                        checkedValue={savedTab == false}
                        name="Unread"
                        setChange={() => dispatch(activeTab(false))}
                    />
                    <RadioType
                        checkedValue={savedTab == true}
                        name="Read"
                        setChange={() => dispatch(activeTab(true))}
                    />
                </div>
            }
            {data.pages.map((result) => {
                return result.results.filter((item: Saved) => savedTab != null ? item.read == savedTab : true).map((item: Saved) => {
                    return (
                        <IndividualSaved key={item.uid} saved={item} />
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

const RadioType = ({ checkedValue, name, setChange }: { checkedValue: boolean, name: string, setChange: ChangeEventHandler<HTMLInputElement> }) => {

    const highlight = useColor()
    return (
        <div className="flex items-center me-4">
            <input
                checked={checkedValue}
                onChange={setChange}
                type="radio" name={name}
                className={`w-4 h-4 ${highlight.border}`}
            />
            <label htmlFor={name} className="ml-2 text-sm text-secondary">
                {name}
            </label>
        </div>
    )
}

export default Bookmarks;