import { useEffect, useState } from "react";

import useColor from "../../utils/colors";

import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";

const ScrollButton = ({userHighlight} : {userHighlight?: string}) => {
    const highlight = useColor()

    const [scroll, setScroll] = useState<boolean>(false);

    const handleVisibleButton = () => {
        const position = window.pageYOffset;

        if (position > 50) {
            setScroll(true);
        } else if (position < 50) {
            setScroll(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleVisibleButton);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className={`overflow-hidden transition-height ease-in-out duration-500
                        ${scroll ? "h-20" : "h-0"}
                        `}>
                <button onClick={() => scrollToTop()} className="cursor-pointer z-60">
                    <ArrowUpCircleIcon className={`size-12 rounded-full text-white z-60
                    ${userHighlight == "default" ? "bg-grave" : highlight.bg}
                    `} />
                </button>
            </div>
        </>
    )
}

export default ScrollButton;