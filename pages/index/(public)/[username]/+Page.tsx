import { navigate } from "vike/client/router";
import { useData } from "vike-react/useData";
import { useEffect, useRef, useState } from "react";

import { Data } from "./+data";
import type { PublicUserCollection } from "../../../../utils/types";

import Bio from "../components/Bio";
import ScrollButton from "../../../../layouts/components/ScrollButton";
import Transition from "../components/Transition";
import PublicNav from "../components/Nav";

import { useGetBookmarksQuery } from "../../../../store/api/profile";

import "../../../../layouts/style.css";
import useColor from "../../../../utils/colors";

const Page = () => {
    const user = useData<Data>();
    const highlight = useColor(user.highlight)

    const { isError, isSuccess } = useGetBookmarksQuery()


    return (
        <>
            <Transition />
            <div className="fixed right-5 bottom-10">
                <ScrollButton userHighlight={user.highlight} />
            </div>
            <div className={`min-h-screen ${user.highlight == "default" ? "bg-grave" : highlight.bg}`}>
                <PublicNav isSuccess={isSuccess} isError={isError} />
                <div className="flex justify-center">
                    <div className="lg:basis-1/3 w-full px-10 lg:px-0">
                        <Bio
                            avatar={user.avatar}
                            userHighlight={user.highlight}
                            username={user.username}
                            bio={user.bio}
                        />
                        {user.collections.length > 0 &&
                            <div className="card mt-10">
                                <div className="card-body">
                                    <div className="content">
                                        {user.collections.map((item, i) => {
                                            return (
                                                <Collection
                                                    key={item.uid}
                                                    item={item}
                                                    highlight={user.highlight == "default" ? "hover:text-grave" : highlight.hover}
                                                    username={user.username}
                                                    i={i}
                                                />

                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

const Collection = ({ item, highlight, username, i }: { item: PublicUserCollection, highlight: string, username: string, i: number }) => {
    return (
        <div className="not-last:mb-5">
            <div className="flex items-center">
                <span className="text-primary text-sm mr-2">
                    {i}.
                </span>
                <a href={`/@${username}/${item.uid}`} 
                    className={`break-all ${highlight} font-bold lg:hover:underline decoration-2 text-lg underline lg:no-underline
                `}>
                    {item.name}
                </a>

            <span className="text-xs text-dull ml-2">
                {`(${item.recs} fics)`}
            </span>
            </div>
            {!item.about &&
                <p className="text-dull text-sm mt-2 ml-6 break-all">
                    {item.about}
                </p>
            }
        </div>
    )
}

export default Page;