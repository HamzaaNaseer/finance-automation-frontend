import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const passApi = createApi({
  reducerPath: "passApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_HOSTNAME }),
  tagTypes: ["Passes"],
  endpoints: (builder) => ({
    getPasses: builder.query({
      query: () => ({
        url: "/api/v1/getAllPasses",
        headers: { token: localStorage.getItem("userToken") },
      }),
      providesTags: ["Passes"],
    }),
  }),
});

export const { useGetPassesQuery } = passApi;
