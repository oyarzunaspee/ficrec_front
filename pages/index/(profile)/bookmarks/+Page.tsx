import { useState, useEffect, useMemo, ChangeEventHandler } from "react";

import type { Saved } from "../../../../utils/types";

import IndividualSaved from "./Saved";
import Loading from "../../../../components/Loading";


import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useGetSavedInfiniteQuery } from "../../../../store/api/profile";
import { updateQuery } from "../../../../store/slices/query";
import { activeTab } from "../../../../store/slices/savedTab";
import { useMediaQuery } from "../../../../utils/mediaQuery";
import useColor from "../../../../utils/colors";
import { useInfiniteScroll } from "../../../../utils/infiniteScroll";

const Page = () => {
    const dispatch = useAppDispatch()
    const isLG = useMediaQuery()

    const query = useAppSelector((state) => state.query.value);
    const savedTab = useAppSelector((state) => state.savedTab.value)

    const useQueryResult = useGetSavedInfiniteQuery({ query: query })
    const { data, isFetching, fetchNextPage, refetch } = useQueryResult

    const { total, currentPage } = useInfiniteScroll({
        data: data,
        isFetching: isFetching,
        fetchNextPage: fetchNextPage,
        refetch: refetch,
        query: query
    })


    useEffect(() => {
        dispatch(updateQuery(""))
    }, [])

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

export default Page;