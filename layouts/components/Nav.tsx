import { HomeIcon, BookmarkIcon, MagnifyingGlassCircleIcon, SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { usePageContext } from "vike-react/usePageContext";
import { useAppSelector } from "../../store/hooks";
import useColor from "../../utils/colors";

const Nav = () => {
  const navOpen = useAppSelector((state) => state.nav.value)

  const highlight = useColor()
  const context = usePageContext()

  return (
    <>
      <div className={`overflow-hidden transition-height duration-300 ease-in-out
    ${navOpen ? "max-h-50" : "max-h-0"}
    `}>
        <div className="px-5 pb-1 pt-5 flex justify-around items-center">
          <div className="cursor-pointer px-2">
            <SunIcon className="size-8 lg:size-7 text-dull" />
          </div>
          <a href="/find" className="cursor-pointer px-2">
            <MagnifyingGlassCircleIcon
              className={`size-8 lg:size-7
            ${context.urlParsed.pathname == "/find" ? highlight.text : "text-dull"}
            `}
            />
          </a>
          <a href="/bookmarks" className="cursor-pointer px-2">
            <BookmarkIcon
              className={`size-6 lg:size-5
              ${context.urlParsed.pathname == "/bookmarks" ? highlight.text : "text-dull"}
            `}
            />
          </a>
          <a href="/" className="cursor-pointer px-2">
            <HomeIcon
              className={`size-7 lg:size-6
              ${context.urlParsed.pathname == "/" ? highlight.text : "text-dull"}  
              `}
            />
          </a>

        </div>
      </div>
    </>
  )
}

export default Nav;