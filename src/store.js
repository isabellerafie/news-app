import { configureStore } from "@reduxjs/toolkit"; //to set up the Redux store
import newsReducer from "./reducers/newsReducer"; // Import your reducer

// Create the Redux store
const store = configureStore({
  reducer: {
    news: newsReducer, //assign the newsReducer to a key called news
  },
});

export default store;
