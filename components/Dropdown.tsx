import { MouseEventHandler, RefObject } from "react";

import { IconTag } from "./types";

import { useMediaQuery } from "../utils/mediaQuery";

type Items = {
    title: string;
    Icon: IconTag;
    click: MouseEventHandler<HTMLLIElement>;
}

const Dropdown = ({ right, top, ref, open, items }: { right?: string, top?: string, ref: RefObject<HTMLDivElement | null>, open: boolean, items: Array<Items> }) => {
    const isLG = useMediaQuery();

    return (
        <>
            {(open && !isLG) &&
                <div className="screen"></div>
            }
            <div ref={ref} className={`lg:absolute lg:left-auto lg:z-30 lg:bottom-auto lg:rounded-md lg:flex lg:justify-end lg:bg-transparent
                    ${right ? `${right}` : "lg:right-0"}
                    ${top ? `${top}` : "lg:top-0"}
                    ${open ? "max-h-60" : "max-h-0"}
                    transition-height duration-300 ease-in-out
                    fixed z-40 bottom-0 w-full left-0 bg-white rounded-t overflow-hidden
                    `}>
                <ul className="text-primary 
                lg:border lg:border-base lg:rounded-md lg:bg-white">
                    {items.map((item) => {
                        return (
                            <li
                                key={item.title}
                                onClick={item.click}
                                className="px-10 py-5 text-xl cursor-pointer not-last:border-b border-dashed border-dull hover:bg-hover
                                lg:text-sm lg:px-5 lg:py-3
                                ">
                                <div
                                    className="flex items-center justify-between
                                    ">
                                    {item.title}
                                    <item.Icon className="size-6 mr-2
                                    lg:size-4 lg:ml-2 lg:mr-0
                                    " />
                                </div>
                            </li>

                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default Dropdown;