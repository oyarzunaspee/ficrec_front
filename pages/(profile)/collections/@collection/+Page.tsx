import About from "./About";
import Filter from "./Filter";
import RecList from "./RecList";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useOutsideClick } from "../../../../utils/outsideClick";
import { close } from "../../../../store/slices/popup";
import Popup from "../../../../components/Popup";
import Form from "../../recs/new/Form";


const CollectionDetail = () => {

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

export default CollectionDetail;