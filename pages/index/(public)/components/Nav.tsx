import { useEffect } from "react";
import { usePageContext } from "vike-react/usePageContext";

import Nav from "../../../../layouts/components/Nav";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { active } from "../../../../store/slices/activeUser";


const PublicNav = ({isSuccess, isError} : {isSuccess: boolean, isError: boolean}) => {
    const dispatch = useAppDispatch()
    const { urlParsed } = usePageContext()
    console.log(usePageContext())

    const activeUser = useAppSelector((state) => state.activeUser.value)

    useEffect(() => {
        if (isSuccess) {
            dispatch(active())
        }
    }, [isSuccess])

    return (
        <>
            <div className={` overflow-hidden 
            `}>
                <div className={`w-full 
                transition-height duration-400 ease-in-out
                ${activeUser ? "h-5 fixed z-40" : "h-0"}
                `}>
                    <Nav dashboard={false} />
                </div>
            </div>

            <div className={`transition-opacity duration-400 ease-in-out
            ${isError ? "opacity-100" : "hidden opacity-0"}
            `}>
                <div className="flex pt-3 px-5 justify-end">
                    <span className="text-primary hover:underline">
                        <a href={`/login?redirect=${urlParsed.href}`}>
                            [login]
                        </a>
                    </span>
                </div>

            </div>
        </>
    )
}

export default PublicNav;