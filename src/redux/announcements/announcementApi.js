import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const announcementApi = createApi({
  reducerPath: "announcementApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_HOSTNAME }),
  tagTypes: ["Announcements"],
  endpoints: (builder) => ({
    getAnnouncements: builder.query({
      query: () => ({
        url: "/api/v1/getAllAnnouncements",
        headers: { token: localStorage.getItem("userToken") },
      }),
      providesTags: ["Announcements"],
    }),
    addAnnouncement: builder.mutation({
      query: (announcement) => ({
        url: "/api/v1/createannouncement",
        headers: { token: localStorage.getItem("userToken") },
        method: "POST",
        body: announcement,
      }),
      invalidatesTags: ["Announcements"],
    }),
    deleteAnnouncement: builder.mutation({
      query: (id) => ({
        url: `/api/v1/deleteAnnouncement/${id}`,
        headers: { token: localStorage.getItem("userToken") },
        method: "DELETE",
      }),
      invalidatesTags:["Announcements"]
    }),
  }),
});

export const {
  useGetAnnouncementsQuery,
  useAddAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementApi;
