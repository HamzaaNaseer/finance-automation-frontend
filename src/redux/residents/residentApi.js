import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const residentApi = createApi({
  reducerPath: "residentApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_HOSTNAME }),
  tagTypes: ["Residents"],
  endpoints: (builder) => ({
    getResidents: builder.query({
      query: () => ({
        url: "/api/v1/getAllUsers",
        headers: { token: localStorage.getItem("userToken") },
      }),
      providesTags: ["Residents"],
    }),
  }),
});

export const { useGetResidentsQuery } = residentApi;
