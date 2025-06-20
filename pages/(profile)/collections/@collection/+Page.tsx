import About from "./About";
import Filter from "./Filter";
import RecList from "./RecList";
import Popup from "../../../../components/Popup";
import Form from "../../recs/new/Form";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { close } from "../../../../store/slices/popup";
import { useOutsideClick } from "../../../../utils/outsideClick";


const Page = () => {

    return (
        <>
            <About />
            <Filter />
            <RecList />
            <NewPopUp />
        </>
    )
}


const NewPopUp = () => {
    const dispatch = useAppDispatch();

    const popup = useAppSelector((state) => state.popup.value);


    const ref = useOutsideClick(() => {
        dispatch(close());
    });


    return (
        <>
            <Popup
                ref={ref}
                title="New rec"
                open={popup.open && popup.type == "rec"}
                setOpen={() => dispatch(close())}
                body={(<Form />)}
            />
        </>
    )
}

export default Page;