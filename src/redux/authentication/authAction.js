import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

//----------------USER LOGIN---------------------

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    // send request to this url http://localhost:4000/api/v1/admin

    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      console.log("before sending request");

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_HOSTNAME}/api/v1/admin/login`,
        { email, password },
        config
      );
      console.log("after sending request");
      if (!data.success) {
        return rejectWithValue(data.message); //this will fire the lifecyle action: REJECTED
      }

      //saving the token in the local storage
      localStorage.setItem("userToken", data.token);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("some error occured");
    }
  }
);

//LOAD USER

export const loadUser = createAsyncThunk("user/load", async (_, { rejectWithValue }) => {
  console.log("inside load user");
  const token = localStorage.getItem("userToken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  };
  try {
    console.log("before loading user reqeust");
    const { data } = await axios.get(`${process.env.REACT_APP_API_HOSTNAME}/api/v1/me`, config);
    if (!data.success) {
      return rejectWithValue(data); //this will fire the lifecyle action: REJECTED
    }
    return data;
  } catch (error) {
    console.log(error)
    return rejectWithValue(error);
  }
});
