import { navigate } from "vike/client/router";
import { useData } from "vike-react/useData";

import { Data } from "./+data";
import Bio from "../components/Bio";

import "../../../../layouts/style.css";

const Page = () => {
    const user = useData<Data>();

    return (
        <>
            <div className="min-h-screen bg-base flex flex-col items-center px-5">
                <div className="mt-[15dvh] w-full">
                    <Bio
                        avatar={user.avatar}
                        userHighlight={user.highlight}
                        username={user.username}
                        bio={user.bio}
                    />
                </div>
                <select className="w-full mt-10 bg-white text-primary px-5 py-2 rounded-md">
                    <option>
                        Collections
                    </option>
                    {user.collections.map((item) => {
                        return (
                            <option key={item.uid}
                                onClick={() => {
                                    navigate(`/@${user.username}/${item.uid}`)
                                }}
                            >
                                {item.name}
                            </option>
                        )
                    })}
                </select>
            </div>
        </>
    )
}

export default Page;