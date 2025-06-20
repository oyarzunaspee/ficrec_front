import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    verifyPassword: builder.mutation<void, {password: string}>({
      query: (body) => ({
        url: "/auth/user/verify/",
        method: "POST",
        body
      })
    }),
    changePassword: builder.mutation<void, {password: string, password_check: string}>({
      query: (body) => ({
        url: "/auth/user/password/",
        method: "POST",
        body
      })
    }),
    deactivateUser: builder.mutation<void, {password: string}>({
      query: () => ({
        url: "/auth/user/",
        method: "DELETE"
      })
    })
  })
});

export const { useVerifyPasswordMutation, useChangePasswordMutation, useDeactivateUserMutation } = userApi