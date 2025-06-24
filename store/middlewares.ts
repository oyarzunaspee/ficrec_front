import { Middleware } from '@reduxjs/toolkit';
import { setLocalStorage } from '../utils/localStorage';

const navMiddleware: Middleware = (storeAPI) => {

  return (next) => (action) => {
    const result = next(action);

    if (action.type == "nav/changeNav") {
        setLocalStorage("ficrecnav", storeAPI.getState().nav.value.toString())
    }
    return result;
  };
};

export default navMiddleware;
