import Form from "../new/Form";
import Popup from "../../../components/Popup";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { close } from "../../../store/slices/popup";
import { useOutsideClick } from "../../../utils/outsideClick";


export default function Page() {

  return (
    <>
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
        title="New collection"
        open={popup.open && popup.type == "collection"}
        setOpen={() => dispatch(close())}
        body={(<Form />)}
      />
    </>
  )
}
