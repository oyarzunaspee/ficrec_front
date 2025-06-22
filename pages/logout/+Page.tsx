import { useEffect } from "react";
import { useLogOutMutation } from "../../store/api/auth";
import { navigate } from "vike/client/router";

const Page = () => {
    const [useLogOut, result] = useLogOutMutation()

    useEffect(() => {
        useLogOut()
        .unwrap()
    }, [])

    useEffect(() => {
        if (result.isSuccess) {
            navigate("/login")
        }
    }, [result.isSuccess])
    return (
        <>
        </>
    )
}

export default Page;