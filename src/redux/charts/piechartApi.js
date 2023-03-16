import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const piechartApi = createApi({
  reducerPath: "pieChartApi",
  
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_HOSTNAME }),
  endpoints: (builder) => ({
    
    getPieBarData: builder.query({
      query: () => ({
        url: "/api/v1/piebar",
        headers: { token: localStorage.getItem("userToken") },
      }),
      providesTags:["Data"]
    }),
    refreshPiebar: builder.mutation({
      query: () => ({
        url: "/api/v1/piebar",
        headers: { token: localStorage.getItem("userToken") },
      
      }),
      invalidatesTags: ["Data"],
    }),
  }),
});

export const { useGetPieBarDataQuery,useRefreshPiebarMutation } = piechartApi;
