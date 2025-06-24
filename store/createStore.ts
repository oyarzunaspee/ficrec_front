export { createStore }

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PageContext } from "vike/types";
import { authApi } from "./api/auth";
import { userApi } from "./api/user";
import { publicApi } from "./api/public";
import tokenSlice from "./slices/token";
import activeUserSlice from "./slices/activeUser";
import { profileApi } from "./api/profile";
import { privacyTabSlice } from "./slices/privacyTab";
import { savedTabSlice } from "./slices/savedTab";
import highlightSlice from "./slices/highlight";
import navSlice from "./slices/nav";
import popupSlice from "./slices/popup";
import { collectionDisplaySlice } from "./slices/collectionDisplay";
import { querySlice } from "./slices/query";
import { resultMessageSlice } from "./slices/resultMessage";

import navMiddleware from "./middlewares";

const reducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [publicApi.reducerPath]: publicApi.reducer,
  token: tokenSlice,
  activeUser: activeUserSlice,
  privacyTab: privacyTabSlice.reducer,
  savedTab: savedTabSlice.reducer,
  highlight: highlightSlice,
  nav: navSlice,
  popup: popupSlice,
  collectionDisplay: collectionDisplaySlice.reducer,
  query: querySlice.reducer,
  resultMessage: resultMessageSlice.reducer
})


const createStore = (pageContext: PageContext) => {
  const preloadedState = pageContext.isClientSide && pageContext.redux ? pageContext.redux.ssrState : undefined

  return configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: { pageContext }
        },
      }).concat(navMiddleware, authApi.middleware, profileApi.middleware, userApi.middleware, publicApi.middleware)
  })
}