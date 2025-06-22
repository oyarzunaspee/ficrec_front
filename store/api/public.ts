import { SetStateAction } from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Rec, FindQuery } from "../../utils/types";

export type RecResultOutput = {
  current: number;
  next: number | undefined;
  pages: number;
  results: Rec[];
}

type FindRecsResultOutput = {
  current: number;
  next: number | undefined;
  pages: number;
  results: FindQuery[];
}

export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ficrec.onrender.com/v1/public/" }),
  endpoints: (builder) => ({
    getRecs: builder.infiniteQuery<RecResultOutput, { username: string, uid: string, query: string }, number>({
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
        return `/user/${queryArg.username}/collections/${queryArg.uid}/recs?${queryArg.query ? `query=${queryArg.query}&` : ""}page=${pageParam || 1}`
      }
    }),
    getFindRecs: builder.infiniteQuery<FindRecsResultOutput, { query: string, type: string, tags?: string }, number>({
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
            return `/find/?page=${pageParam || 1}&query=${queryArg.query}&type=${queryArg.type}${queryArg.tags ? `&tags=${queryArg.tags}` : ""}`
          }
        }),
  })
});


export const { useGetRecsInfiniteQuery, useGetFindRecsInfiniteQuery } = publicApi