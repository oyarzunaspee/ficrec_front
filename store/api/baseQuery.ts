import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../types.ts";
import { refreshToken } from "../slices/token";



const baseQuery = fetchBaseQuery({
  // baseUrl: "https://almondluu.pythonanywhere.com/v1/",
  baseUrl: "/api/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).token.value;
    headers.set("Authorization", `Bearer ${token}`)

    return headers
  }
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery("/auth/refresh/", api, extraOptions)

    if (refreshResult.data && typeof refreshResult.data === "object" && "token" in refreshResult.data) {

      api.dispatch(refreshToken(refreshResult.data.token as string));


      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(refreshToken(""));
    }
  }

  return result;
}