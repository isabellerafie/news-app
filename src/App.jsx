import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryList from "./Components/CategoryList";
import Header from "./Components/Header";
import LatestNews from "./Components/LatestNews";
import NewsSliderComponent from "./Components/NewsSlider";
import SpecificCategory from "./Components/SpecificCategory";
import SingleNewsArticle from "./Components/SingleNewsArticle";
import SearchResults from "./Components/SearchResults";

import { Provider } from "react-redux"; // Import the Redux Provider
import store from "./store"; // Import the store

function App() {
  const [activeCategory, setActiveCategory] = useState("");

  return (
    <Provider store={store}>
      <Router>
        <Header setActiveCategory={setActiveCategory} />

        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <NewsSliderComponent />
                <CategoryList />
              </>
            }
          />

          {/* Latest News Route */}
          <Route path="/latest" element={<LatestNews />} />

          {/* Specific Category Route */}
          <Route
            path="/category/:id"
            element={<SpecificCategory activeCategory={activeCategory} />}
          />

          {/* Single News Article Route */}
          <Route path="/news-details/:id" element={<SingleNewsArticle />} />

          {/* Search Results */}
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
