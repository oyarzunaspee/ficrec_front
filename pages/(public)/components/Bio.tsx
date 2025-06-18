import { navigate } from "vike/client/router";

const Bio = ({ avatar, highlight, username, bio }: { avatar?: string, highlight?: string, username: string, bio?: string }) => {

    const highlightValue = `text-${highlight ? highlight : "grave"}`

    return (
        <>
        <div className="w-full flex items-center justify-center relative h-[15dvh]">
            <img src={avatar}
                onClick={() => navigate(`/@${username}`)}
                className="absolute h-[15dvh] aspect-square left-0 rounded-full shadow cursor-pointer object-cover" />
            <div className="w-[90%]">
                <div className="card p-5 break-all rounded-full">
                    <div className="ml-[12dvh] pr-5">
                        <h2 className={`font-bold text-lg
                                    ${highlightValue}    
                                    `}>
                            @{username}
                        </h2>
                        <p className="text-sm text-primary mt-1">
                            {bio}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Bio;