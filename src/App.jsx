import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryList from "./Components/CategoryList";
import Header from "./Components/Header";
import LatestNews from "./Components/LatestNews";
import NewsSliderComponent from "./Components/NewsSlider";
import React, { useState } from "react";
import SpecificCategory from "./Components/SpecificCategory";
import SingleNewsArticle from "./Components/SingleNewsArticle"; // Import the new SingleNewsArticle component

function App() {
  const [activeCategory, setActiveCategory] = useState(""); // Keep activeCategory state

  return (
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
      </Routes>
    </Router>
  );
}

export default App;
