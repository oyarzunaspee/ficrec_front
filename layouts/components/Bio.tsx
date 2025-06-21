import { useState } from "react";
import { navigate } from "vike/client/router";
import { usePageContext } from "vike-react/usePageContext";

import defaultAvatar from "../../assets/defaultAvatar.png";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useMediaQuery } from "../../utils/mediaQuery";
import { changeNav } from "../../store/slices/nav";
import useColor from "../../utils/colors";

import { ChevronUpIcon, ChevronDownIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";

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
            <section className="px-5 py-3 lg:pb-0 ">
                <div className="border-3 border-dotted border-base rounded-lg px-5 py-3 flex relative">
                    {!isLG &&
                        <div
                            onClick={() => dispatch(changeNav(!navOpen))}
                            className="absolute right-0 cursor-pointer px-5 pb-2">
                            {navOpen ?
                                <ChevronUpIcon className={`size-5 font-bold `} />
                                :
                                <ChevronDownIcon className={`size-5  font-bold `} />
                            }
                        </div>
                    }
                    <div
                        onMouseOver={() => setShowConfig(true)}
                        onMouseOut={() => setShowConfig(false)}
                        onClick={() => {
                            if (urlParsed.pathname != "/configuration") {
                                navigate("/configuration")
                            }
                        }}
                        className={`shrink-0 relative aspect-square flex justify-center items-center 
                        transition-width duration-500 ease-in-out    
                        ${isLG ? "w-23" : (navOpen ? "w-23" : "w-0")}
                        `}
                    >
                        {urlParsed.pathname != "/configuration" &&
                            <WrenchScrewdriverIcon className={`size-8 text-white absolute z-10 ${showConfig ? "visible cursor-pointer" : "invisible"}`} />
                        }
                        <img
                            onClick={() => {
                                if (urlParsed.pathname != "/configuration") {
                                    navigate("/configuration")
                                }
                            }}
                            className={`aspect-square object-cover
                                ${urlParsed.pathname != "/configuration" ? "cursor-pointer" : "cursor-default"}
                                ${urlParsed.pathname != "/configuration" ? (showConfig ? "brightness-70" : "brightness-100") : "brightness-100"}`}
                            src={avatar ? avatar : defaultAvatar} alt="" />
                    </div>
                    <div className="text-wrap ml-2 break-all flex-1">
                        <h2 className={`text-wrap break-all ${highlight.text} font-bold mr-8 lg:mr-0`}>
                            @{(isLG && username.length > 16) ? username.slice(0, 18) + "..." : username}
                        </h2>
                        {((isLG && username.length < 17) || (!isLG && navOpen)) &&
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