import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const homepageApi = createApi({
  reducerPath: "homepageApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_HOSTNAME }),
  tagTypes: ["Data"],
  endpoints: (builder) => ({
    getHomepageData: builder.query({
      query: () => ({
        url: "/api/v1/homepage",
        headers: { token: localStorage.getItem("userToken") },
      }),
      providesTags: ["Data"],
    }),
    refreshHomepage: builder.mutation({
      query: () => ({
        url: "/api/v1/homepage",
        headers: { token: localStorage.getItem("userToken") },
      
      }),
      invalidatesTags: ["Data"],
    }),
  }),
});

export const { useGetHomepageDataQuery,useRefreshHomepageMutation } = homepageApi;
