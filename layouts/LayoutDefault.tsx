import "./style.css";

import "./tailwind.css";

import { navigate } from "vike/client/router";
import { useGetUserQuery } from "../store/api/profile";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { usePageContext } from "vike-react/usePageContext";
import Nav from "./components/Nav";
import Bio from "./components/Bio";
import Tabs from "./components/Tabs";
import ColletionList from "./components/CollectionList";
import { useMediaQuery } from "../store/hooks";
import NewButton from "./components/NewButton";
import ScrollButton from "./components/ScrollButton";
import { updateHighlight } from "../store/slices/highlight";
import ResultMessage from "./components/ResultMessage";


export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const context = usePageContext();


  const token = useAppSelector((state) => state.token.value);

  const { data, error, isLoading } = useGetUserQuery();

  const isLG = useMediaQuery();

  useEffect(() => {
    if (error) {
      navigate("/login")

    }
  }, [error])

  useEffect(() => {
    if (data) {
      dispatch(updateHighlight(data.highlight))
    }
  }, [data])

  if (!data) return null;


  return (
    <>

      <div className="bg-base min-h-screen">
        <div className="lg:flex lg:justify-">
          <div className="top-0 sticky w-full
            lg:left-0 lg:h-screen lg:flex lg:mb-0 lg:w-auto lg:fixed
            "
          >
            <div className="bg-white text-primary
            lg:basis-1/4 lg:flex lg:flex-col lg:fixed lg:h-full
            xl:basis-1/6
            ">
              <Nav />
              <Bio username={data.username} bio={data.bio} avatar={data.avatar} />
              {(["/", "/bookmarks"].includes(context.urlParsed.pathname) || isLG) &&
                <Tabs />
              }
              <div className="lg:overflow-y-scroll lg:flex-1">
                <ColletionList collections={data.collections} />
              </div>
            </div>
          </div>
          <div className="lg:basis-1/3"></div>
          <div className="lg:basis-3/4 xl:basis-2/4">
            <div className="lg:flex lg:justify-center">
              <div className="lg:basis-2/3">
                <div className="p-5">
                  {!isLG && context.urlParsed.pathname == "/" &&
                    <>
                      <CollectionListMobile collections={data.collections} />
                    </>
                  }
                  {children}
                </div>
              </div>
              <div className="fixed bottom-15 right-3 lg:right-10">
                <NewButton />
                <ScrollButton />
              </div>
              <ResultMessage />
            </div>
          </div>
        </div>
      </div>
    </>
  )


}

type CollectionData = {
  name: string;
  uid: string;
  recs: number;
  private: boolean;
}

const CollectionListMobile = ({ collections }: { collections: Array<CollectionData> }) => {
  const context = usePageContext()
  const privacyTab = useAppSelector((state) => state.privacyTab.value);

  return (
    <>
      {context.urlParsed.pathname != "/bookmarks" &&
        <section className="px-5 pb-5">
          {collections.map((col) => {
            if (col.private == privacyTab) {
              return (
                <a key={col.uid} href={`/collections/${col.uid}`}>
                  <div key={col.uid} className="cursor-pointer bg-white p-5 rounded-md mb-5 shadow-sm">
                    <div className="flex justify-between items-center">
                      <h2 className="not-[]:text-md">
                        {col.name}
                      </h2>
                      <span>
                        {col.recs}
                      </span>
                    </div>
                  </div>
                </a>
              )
            }
          })}
        </section>
      }
    </>
  )
}
