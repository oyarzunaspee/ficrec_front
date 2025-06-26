import defaultAvatar from "../../../../assets/defaultAvatar.png"

import useColor from "../../../../utils/colors";

import * as motion from "motion/react-client"
import { useAppSelector } from "../../../../store/hooks";




type Props = {
    avatar?: string;
    userHighlight?: string;
    username: string;
    bio?: string;
}

const Bio = ({ avatar, userHighlight, username, bio }: Props) => {
    const highlight = useColor(userHighlight)
    const navOpen = useAppSelector((state) => state.nav.value)
    const activeUser = useAppSelector((state) => state.activeUser.value)

    return (
        <>

            <div className="flex flex-col items-center">
                <a href={`/@${username}`} className="w-30 absolute">
                    <TransitionOptions avatar={avatar} />
                </a>
                <div className={`w-full px-5 card pb-5
                ${(activeUser && navOpen) ? "mt-30" : "mt-17"}
                `}>
                    <div className="lg:basis-1/3 relative">
                        <h2 className={` mr-1 font-bold text-xl break-all mb-2 mt-22 text-center
                        ${userHighlight == "default" ? "text-grave" : highlight.text}
                 
                    `}>
                            @{username}
                        </h2>
                        {bio &&
                            <p className="whitespace-pre-line text-dull text-center">
                                {bio}
                            </p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

const TransitionOptions = ({ avatar}: { avatar?: string }) => {
    const navOpen = useAppSelector((state) => state.nav.value)
    const activeUser = useAppSelector((state) => state.activeUser.value)
    return (
        <motion.img
            src={avatar || defaultAvatar}
            className={`absolute aspect-square shadow border-3 border-white cursor-pointer object-cover w-30 rounded-full
            ${(activeUser && navOpen) ? "mt-20" : ""}
            `}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        />
    )
}

export default Bio;