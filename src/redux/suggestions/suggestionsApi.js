import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const suggestionApi = createApi({
  reducerPath: "suggestionApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_HOSTNAME }),
  tagTypes: ["Suggestions"],
  endpoints: (builder) => ({
    getSuggestions: builder.query({
      query: () => ({
        url: "/api/v1/getAllSuggestions",
        headers: { token: localStorage.getItem("userToken") },
      }),
      providesTags: ["Suggestions"],
    }),
  }),
});

export const { useGetSuggestionsQuery } = suggestionApi;
