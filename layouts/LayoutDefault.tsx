import { useEffect } from "react";
import { usePageContext } from "vike-react/usePageContext";

import Bio from "./components/Bio";
import ColletionList from "./components/CollectionList";
import Nav from "./components/Nav";
import NewButton from "./components/NewButton";
import ScrollButton from "./components/ScrollButton";
import Tabs from "./components/Tabs";
import ResultMessage from "./components/ResultMessage";
import Transition from "../pages/index/(public)/components/Transition";

import "./style.css";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changeNav } from "../store/slices/nav";
import { useMediaQuery } from "../utils/mediaQuery";
import { useGetUserQuery } from "../store/api/profile";
import { updateHighlight } from "../store/slices/highlight";
import { getFromLocalStorage } from "../utils/localStorage";

import { ArrowPathIcon } from "@heroicons/react/24/solid";


const LayoutDefault = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { urlParsed } = usePageContext();
  const isLG = useMediaQuery();

  const navOpen = useAppSelector((state) => state.nav.value)

  useEffect(() => {
    const navValue = localStorage.getItem("ficrecnav")
    dispatch(changeNav(navValue == "true"))
  }, [])

  const { data, error, isError, isSuccess, isLoading } = useGetUserQuery();

  useEffect(() => {
    if (data && data.highlight != undefined) {
      dispatch(updateHighlight(data.highlight))
    }
  }, [data])

  if (isLoading) {
    return (
      <div className="h-screen bg-base flex justify-center items-center">
        <ArrowPathIcon className="size-10 text-hover animate-spin" />
      </div>
    )
  }

  if (!data) return null;

  return (
    <>
      <div className="min-h-screen bg-base">
        <div className="lg:fixed z-60">
          <div className="bg-white lg:h-screen lg:w-70 fixed w-full shadow">
            <div className="flex flex-col h-full">
              <div className="">
                <div className={`overflow-hidden transition-height duration-300 ease-in-out
                ${isLG ? "max-h-50" : (navOpen ? "max-h-50" : "max-h-0")}
                `}>
                  <Nav />
                </div>
                <Bio username={data.username} bio={data.bio} avatar={data.avatar} />
                {(["/", "/bookmarks"].includes(urlParsed.pathname) || isLG) &&
                  <Tabs />
                }
              </div>
              <div className="flex-1 overflow-y-scroll">
                <ColletionList collections={data.collections} />
              </div>
            </div>

          </div>
        </div>
        <div className="lg:ml-70">
          <div className="lg:flex lg:justify-center">
            <div className="lg:basis-2/3 xl:basis-2/4">
              <div className="lg:mt-15 p-5 lg:p-0">
                {!isLG && urlParsed.pathname == "/" ?
                  <div className={navOpen ? "mt-70" : "mt-40"}>
                    <CollectionListMobile collections={data.collections} />
                  </div>
                  :
                  <div className={`${navOpen ? "mt-55" : "mt-25"} lg:mt-0`}>
                    {children}
                  </div>
                }
              </div>
              <div className={`fixed right-5 lg:right-10 lg:bottom-20 ${navOpen && !isLG ? "bottom-10" : ""} ${!navOpen && !isLG ? "bottom-20" : ""}`}>
                <NewButton />
                <ScrollButton userHighlight={data.highlight} />
              </div>
              <ResultMessage />
            </div>
          </div>

        </div>
        <div className="fixed bottom-0 w-full">
          <div className={`overflow-hidden transition-height duration-300 ease-in-out
          ${!navOpen && !isLG ? "max-h-50" : "max-h-0"}
          `}>
            <Nav />
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
  const { urlParsed } = usePageContext()
  const privacyTab = useAppSelector((state) => state.privacyTab.value);

  return (
    <>
      {urlParsed.pathname != "/bookmarks" &&
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

export default LayoutDefault;