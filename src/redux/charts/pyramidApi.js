import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pyramidApi = createApi({
  reducerPath: "pyramidApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_HOSTNAME }),
  endpoints: (builder) => ({
    getPyramidData: builder.query({
      query: () => ({
        url: "/api/v1/pyramid",
        headers: { token: localStorage.getItem("userToken") },
      }),
    }),
  }),
});

export const { useGetPyramidDataQuery } = pyramidApi;
