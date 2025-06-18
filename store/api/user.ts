import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";


type PasswordInput = {
  password: string;
}

type ChangeInput = {
  password: string;
  password_check: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    verifyPassword: builder.mutation<void, PasswordInput>({
      query: (body) => ({
        url: "/auth/user/verify/",
        method: "POST",
        body
      })
    }),
    changePassword: builder.mutation<void, ChangeInput>({
      query: (body) => ({
        url: "/auth/user/password/",
        method: "POST",
        body
      })
    }),
    deactivateUser: builder.mutation<void, PasswordInput>({
      query: () => ({
        url: "/auth/user/",
        method: "DELETE"
      })
    })
  })
});

export const { useVerifyPasswordMutation, useChangePasswordMutation, useDeactivateUserMutation } = userApi