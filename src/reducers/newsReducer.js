import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //initial state for the news slice
  latestNews: [],
  status: "idle",
  error: null,
};

const newsSlice = createSlice({
  name: "news", //slice name
  initialState, //starting state for the news slice
  reducers: {
    //hon mn3arref action reducers for this slice
    setLatestNews: (state, action) => {
      //updates the latest news state in Redux
      state.latestNews = action.payload;
    },
    setStatus: (state, action) => {
      //updates the status of the API request (loading, succeeded, or failed).
      state.status = action.payload;
    },
    setError: (state, action) => {
      //sets an error message in case the API call fails
      state.error = action.payload;
    },
  },
});

export const { setLatestNews, setStatus, setError } = newsSlice.actions;
export default newsSlice.reducer;
