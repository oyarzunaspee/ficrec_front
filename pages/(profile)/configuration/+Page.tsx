import { useState } from "react";
import { useGetUserQuery } from "../../../store/api/profile";
import Bio from "./Bio";
import Deactivate from "./Deactivate";
import Password from "./Password";
import Username from "./Username";

const Configuration = () => {

    const [open, setOpen] = useState(1);

    const { data, error, isLoading } = useGetUserQuery();

    if (!data) return null;

    return (
        <>
            <Bio open={open} setOpen={setOpen} highlight={data.highlight} avatar={data.avatar} bio={data.bio} />

            <Username open={open} setOpen={setOpen} username={data.username} />

            <Password open={open} setOpen={setOpen} />

            <Deactivate open={open} setOpen={setOpen} />
        </>
    )
}

export default Configuration;