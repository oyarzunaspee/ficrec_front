import { SetStateAction } from "react";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import type { User, Collection, Rec, Saved } from "../../utils/types";

type RecResultOutput = {
  current: number;
  next: number | undefined;
  pages: number;
  results: Rec[];
}

type SavedResultOutput = {
  current: number;
  next: number | undefined;
  pages: number;
  result: Saved[];
}

type SavedInput = {
  username: string;
  collection: string;
  rec: string;
}

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["user", "collection", "recs", "bookmarks", "saved"],
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => ({
        url: "/profile/user/",
        method: "GET"
      }),
      providesTags: ["user", "collection"]
    }),
    updateProfile: builder.mutation<Partial<User>, Partial<User>>({
      query: (body) => ({
        url: "/profile/user/update/",
        method: "PATCH",
        body
      }),
      invalidatesTags: ["user"]
    }),
    changeUsername: builder.mutation<User, {new_username: string}>({
      query: (body) => ({
        url: "/auth/user/username/",
        method: "POST",
        body
      }),
      invalidatesTags: ["user"]
    }),
    getCollection: builder.query<Collection, string>({
      query: (collection) => ({
        url: `/profile/collections/${collection}/`,
        method: "GET"
      }),
      providesTags: ["collection"]
    }),
    editCollection: builder.mutation<Collection, { uid: string, data: Partial<Collection> }>({
      query: ({ uid, data }) => ({
        url: `/profile/collections/${uid}/`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["collection"]
    }),
    deleteCollection: builder.mutation<void, string>({
      query: (collection) => ({
        url: `/profile/collections/${collection}/`,
        method: "DELETE"
      }),
      invalidatesTags: ["collection"]
    }),
    newCollection: builder.mutation<Collection, Partial<Collection>>({
      query: (body) => ({
        url: "/profile/collections/",
        method: "POST",
        body
      }),
      invalidatesTags: ["user"]
    }),
    toggleCollection: builder.mutation<void, { uid: string, data: { toggle: string } }>({
      query: ({ uid, data }) => ({
        url: `/profile/collections/${uid}/toggle/`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["recs", "collection"]
    }),
    getRecs: builder.infiniteQuery<RecResultOutput, { uid: string, query: string }, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (
          lastPage,
          allPages,
          lastPageParam,
          allPageParams,
          queryArg,
        ) => lastPageParam + 1
      },
      query({ queryArg, pageParam }) {
        return `/profile/collections/${queryArg.uid}/recs/?page=${pageParam || 1}${queryArg.query ? "&query=" + queryArg.query : ""}`
      },
      providesTags: ["recs"]
    }),
    addRec: builder.mutation<Rec, { uid: string, data: { notes?: string, code: string } }>({
      query: ({ uid, data }) => ({
        url: `/profile/collections/${uid}/add/rec/`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["recs", "user"]
    }),
    editRec: builder.mutation<Rec, { collection: string, uid: string, data: Pick<Rec, "notes"> }>({
      query: ({ collection, uid, data }) => ({
        url: `/profile/collections/${collection}/recs/${uid}/`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["recs"]
    }),
    deleteRec: builder.mutation<void, { collection: string, uid: string }>({
      query: ({ collection, uid }) => ({
        url: `/profile/collections/${collection}/recs/${uid}/`,
        method: "DELETE"
      }),
      invalidatesTags: ["recs"]
    }),
    getBookmarks: builder.query<{bookmarks: string[] | []}, void>({
      query: () => ({
        url: "/profile/user/bookmarks/",
        method: "GET"
      }),
      providesTags: ["bookmarks"]
    }),
    addSaved: builder.mutation<void, SavedInput>({
      query: ({ username, collection, rec }) => ({
        url: `/public/user/${username}/collections/${collection}/recs/${rec}/`,
        method: "POST"
      }),
      invalidatesTags: ["bookmarks"]
    }),
    getSaved: builder.infiniteQuery<SavedResultOutput, { query: string }, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (
          lastPage,
          allPages,
          lastPageParam,
          allPageParams,
          queryArg,
        ) => lastPageParam + 1
      },
      query({ queryArg, pageParam }) {
        return `/profile/saved/?page=${pageParam || 1}${queryArg.query ? "&query=" + queryArg.query : ""}`
      },
      providesTags: ["saved"]
    }),
    deleteSaved: builder.mutation<void, string>({
      query: (uid) => ({
        url: `/profile/saved/${uid}/`,
        method: "DELETE"
      }),
      invalidatesTags: ["saved"]
    }),
    markAsRead: builder.mutation<void, string>({
      query: (uid) => ({
        url: `/profile/saved/${uid}/toggle/`,
        method: "PATCH"
      }),
      invalidatesTags: ["saved"]
    })
  })
});


export const { 
  useGetUserQuery, 
  useUpdateProfileMutation, 
  useChangeUsernameMutation, 
  useGetCollectionQuery, 
  useEditCollectionMutation, 
  useDeleteCollectionMutation, 
  useNewCollectionMutation, 
  useToggleCollectionMutation, 
  useGetRecsInfiniteQuery, 
  useAddRecMutation, 
  useEditRecMutation, 
  useDeleteRecMutation, 
  useGetBookmarksQuery, 
  useAddSavedMutation, 
  useGetSavedInfiniteQuery,
  useDeleteSavedMutation,
  useMarkAsReadMutation
} = profileApi