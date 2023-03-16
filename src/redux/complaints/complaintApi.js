import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const complaintApi = createApi({
  reducerPath: "complaintApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_HOSTNAME }),
  tagTypes: ["Complaints"],
  endpoints: (builder) => ({
    getComplaints: builder.query({
      query: () => ({
        url: "/api/v1/getAllComplaints",
        headers: { token: localStorage.getItem("userToken") },
      }),
      providesTags: ["Complaints"],
    }),
    updateComplaints: builder.mutation({
      query: (complaintsToUpdate) => ({
        url: "/api/v1/updateComplaints",
        headers: { token: localStorage.getItem("userToken") },
        method: "PUT",
        body: { complaintsToUpdate },
      }),
      invalidatesTags: ["Complaints"],
    }),
  }),
});

export const { useGetComplaintsQuery, useUpdateComplaintsMutation } =
  complaintApi;
