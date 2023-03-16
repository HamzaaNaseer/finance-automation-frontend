import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userChartApi = createApi({
  reducerPath: "userChartApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_HOSTNAME }),
  endpoints: (builder) => ({
    getUsersData: builder.query({
      query: () => ({
        url: "/api/v1/usercount",
        headers: { token: localStorage.getItem("userToken") },
      }),
    }),
  }),
});

export const { useGetUsersDataQuery } = userChartApi;
