import { usePageContext } from "vike-react/usePageContext";

import defaultAvatar from "../../assets/defaultAvatar.png";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useMediaQuery } from "../../utils/mediaQuery";
import { changeNav } from "../../store/slices/nav";
import useColor from "../../utils/colors";

import { ChevronUpIcon, ChevronDownIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type BioProps = {
    username: string;
    bio?: string;
    avatar?: string;
}

const Bio = ({ username, bio, avatar }: BioProps) => {
    const dispatch = useAppDispatch()
    const { urlParsed } = usePageContext()
    const isLG = useMediaQuery();
    const highlight = useColor()

    const navOpen = useAppSelector((state) => state.nav.value)

    const [showConfig, setShowConfig] = useState(false)


    return (
        <>
            <section className="px-5 py-3 lg:pb-0">
                <div 
                onMouseOver={() => setShowConfig(true)}
                onMouseOut={() => setShowConfig(false)}
                className="
                  lg:relative
                  border-3 border-dotted border-base rounded-lg px-5 py-3 relative">
                    <input
                        type="checkbox"
                        checked={navOpen}
                        className="peer sr-only"
                        readOnly
                    />
                    <label
                        onClick={() =>  dispatch(changeNav(!navOpen))}
                        className="
                          lg:hidden
                          right-5 absolute cursor-pointer"
                    >
                        {navOpen ?
                            <ChevronUpIcon className={`size-5 font-bold `} />
                            :
                            <ChevronDownIcon className={`size-5  font-bold `} />
                        }
                    </label>
                    <div className="
                      lg:w-23 lg:mr-2
                      aspect-square bg-gray-200 inline-block w-0 peer-checked:w-23 peer-checked:mr-2 rounded-lg transition-height duration-500 ease-in-out"
                    >
                        <a href="/">
                            <img src={avatar ? avatar : defaultAvatar} alt="" />
                        </a>
                    </div>
                    <div className="inline-block align-top">
                        <h2 className={`${highlight.text}
                        font-bold inline-block align-top `}>
                            @{username}
                            {(navOpen || isLG) && urlParsed.pathname != "/configuration" &&
                                <span className={`
                                      ${showConfig ? "inline-block" : "hidden"}
                                      lg:absolute right-5
                                      text-sm align-top ml-2
                                      `}
                                >
                                    <a href="/configuration">
                                        <PencilSquareIcon className="size-5 cursor-pointer text-gray-400" />
                                    </a>
                                </span>
                            }
                        </h2>
                        {(navOpen || isLG) &&
                            <p className="text-xs mt-2 pr-2 ml-1 text-gray-500">
                                {bio}
                            </p>}

                    </div>
                </div>
            </section>
        </>
    )
}

export default Bio;