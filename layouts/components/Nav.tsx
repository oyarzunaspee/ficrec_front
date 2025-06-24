import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

import { useAppSelector } from "../../store/hooks";
import { useLogOutMutation } from "../../store/api/auth";
import useColor from "../../utils/colors";

import { HomeIcon, BookmarkIcon, MagnifyingGlassCircleIcon, ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";
import { useMediaQuery } from "../../utils/mediaQuery";

const Nav = () => {
  const highlight = useColor()
  const { urlParsed } = usePageContext()
  const isLG = useMediaQuery()
  
  const navOpen = useAppSelector((state) => state.nav.value)

  const [useLogOut, result] = useLogOutMutation()

  const performLogOut = async () => {
    await useLogOut()
    .unwrap()
  }

  if (result.isSuccess) {
    navigate("/login")
  }

  return (
    <>
      
        <div className={`px-5 ${(navOpen && !isLG) || isLG ? "pt-3 pb-1" : ""} ${!navOpen && !isLG ? "py-3" : ""}  flex justify-around items-center bg-white`}>
          <div 
          onClick={performLogOut}
          className="cursor-pointer px-2">
            <ArrowUpOnSquareIcon className="size-8 rotate-270 lg:size-7 text-dull" />
          </div>
          <a href="/find" className="cursor-pointer px-2">
            <MagnifyingGlassCircleIcon
              className={`size-8 lg:size-7
            ${urlParsed.pathname == "/find" ? highlight.text : "text-dull"}
            `}
            />
          </a>
          <a href="/bookmarks" className="cursor-pointer px-2">
            <BookmarkIcon
              className={`size-6 lg:size-5
              ${urlParsed.pathname == "/bookmarks" ? highlight.text : "text-dull"}
            `}
            />
          </a>
          <a href="/" className="cursor-pointer px-2">
            <HomeIcon
              className={`size-7 lg:size-6
              ${urlParsed.pathname == "/" ? highlight.text : "text-dull"}  
              `}
            />
          </a>

        </div>
      
    </>
  )
}

export default Nav;