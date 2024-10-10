import React, { useState, useEffect } from "react";
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

import { registerSW } from "virtual:pwa-register";

function App() {
  const [activeCategory, setActiveCategory] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <div className={`app-container ${isSidebarVisible ? "shift-left" : ""}`}>
      <Provider store={store}>
        <Router>
          <Header
            setActiveCategory={setActiveCategory}
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={setIsSidebarVisible}
          />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NewsSliderComponent />
                  <CategoryList />
                </>
              }
            />
            <Route path="/latest" element={<LatestNews />} />
            <Route
              path="/category/:id"
              element={<SpecificCategory activeCategory={activeCategory} />}
            />
            <Route path="/news-details/:id" element={<SingleNewsArticle />} />
            <Route path="/search-results" element={<SearchResults />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
