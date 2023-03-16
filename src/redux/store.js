import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authentication/authSlice";
import { announcementApi } from "./announcements/announcementApi";
import { complaintApi } from "./complaints/complaintApi";
import { residentApi } from "./residents/residentApi";
import { passApi } from "./passes/passApi";
import { suggestionApi } from "./suggestions/suggestionsApi";
import { piechartApi } from "./charts/piechartApi";
import { pyramidApi } from "./charts/pyramidApi";
import { userChartApi } from "./charts/userChartApi";
import { homepageApi } from "./homepage/homepageApi";

const store = configureStore({
  reducer: {
    auth: userReducer,
    [announcementApi.reducerPath]: announcementApi.reducer,
    [complaintApi.reducerPath]: complaintApi.reducer,
    [residentApi.reducerPath]: residentApi.reducer,
    [passApi.reducerPath]: passApi.reducer,
    [suggestionApi.reducerPath]: suggestionApi.reducer,
    [piechartApi.reducerPath]: piechartApi.reducer,
    [pyramidApi.reducerPath]: pyramidApi.reducer,
    [userChartApi.reducerPath]: userChartApi.reducer,
    [homepageApi.reducerPath]: homepageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      announcementApi.middleware,
      complaintApi.middleware,
      passApi.middleware,
      suggestionApi.middleware,
      homepageApi.middleware,
      piechartApi.middleware,
    ]),
});
export default store;
