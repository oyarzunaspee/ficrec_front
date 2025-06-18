import { useData } from "vike-react/useData";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

export default function Page() {
    const [logInCard, setLogInCard] = useState(false);

    return (
        <>

            <div className="md:flex md:justify-center md:w-full">
                <div className={`card relative ${logInCard && "hidden"}
                    lg:mr-10 lg:block lg:basis-1/3 md:basis-2/3
                    `}>

                    <SignUp icon={ArrowLeftEndOnRectangleIcon} onClick={() => setLogInCard(!logInCard)} />
                </div>
                <div className={`card relative ${!logInCard && "hidden"}
                    lg:ml-10 lg:block lg:basis-1/3 lg:flex-col md:basis-2/3
                    `}>
                    <LogIn icon={ArrowLeftEndOnRectangleIcon} onClick={() => setLogInCard(!logInCard)} />
                </div>
            </div>
        </>
    );
}
