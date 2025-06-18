import { useData } from "vike-react/useData";
import { navigate } from "vike/client/router";
import { withFallback } from "vike-react-query";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { get } from "react-hook-form";
import { refreshToken } from "../../../store/slices/token";
import { useOutsideClick } from "../../../utils/outsideClick";
import { close } from "../../../store/slices/popup";
import Form from "../new/Form";
import Popup from "../../../components/Popup";


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
