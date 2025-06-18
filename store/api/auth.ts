import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignUpInput, LogInInput, Token } from "../../utils/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth/" }),
  endpoints: (builder) => ({
    signUp: builder.mutation<void, SignUpInput>({
      query: (body) => ({
        url: "/signup/",
        method: "POST",
        body
      })
    }),
    login: builder.mutation<Token, LogInInput>({
      query: (body) => ({
        url: "/login/",
        method: "POST",
        body
      })
    }),
    refresh: builder.query<Token, void>({
      query: () => ({
        url: "/refresh/",
        method: "GET"
      })
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({
        url: "/logout/",
        method: "POST"
      })
    })
  })
});

export const { useSignUpMutation, useLoginMutation, useRefreshQuery, useLogOutMutation } = authApi