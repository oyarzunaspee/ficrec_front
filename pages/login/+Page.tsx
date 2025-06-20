import { useState } from "react";

import LogIn from "./LogIn";
import SignUp from "./SignUp";

import "../../layouts/style.css";


import { Provider } from "react-redux";
import { createStore } from "../../store/createStore";
import type { PageContext } from "vike/types";
import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";

const Page = () => {
    const [logInCard, setLogInCard] = useState<boolean>(true);

    return (
        <>
            <Provider store={createStore({} as PageContext)}>
                <div className="min-h-screen bg-base flex justify-center">
                    <div className="lg:basis-1/3 xl:basis-1/4 md:basis-1/2 w-full">
                        <div className="lg:p-5 p-10 w-full">
                            <div className="flex flex-col">
                                <div className="flex justify-center items-center mt-20 lg:mt-30">
                                    <img src="public/ao3.png" alt="" className="w-30" />
                                    <h1 className="font-mono tracking-widest text-white text-shadow-md text-[2em] font-bold">
                                        FicRec
                                    </h1>
                                </div>
                                <div className="mt-10 mb-5 w-full">
                                    {logInCard ?
                                        <LogIn />
                                        :
                                        <SignUp />
                                    }
                                </div>
                                <div
                                    onClick={() => setLogInCard(!logInCard)}
                                    className="hover:underline underline lg:no-underline hover:cursor-pointer py-3 px-5 flex justify-center items-center"
                                >
                                    <h2 className="text-grave">
                                        {logInCard ?
                                            "Create an account instead"
                                            :
                                            "Or log in to your account"
                                        }
                                    </h2>
                                    <CursorArrowRaysIcon className="size-5 text-grave ml-1" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Provider>
        </>
    );
}

export default Page;