import "./App.css";
import CategoryList from "./Components/CategoryList";
import Header from "./Components/Header";
import LatestNews from "./Components/LatestNews";
import NewsSliderComponent from "./Components/NewsSlider";
import React, { useState } from "react";
import SpecificCategory from "./Components/SpecificCategory";

function App() {
  const [activePage, setActivePage] = useState("home"); // Track active page
  const [activeCategory, setActiveCategory] = useState(""); // Track active category

  return (
    <>
      {/* Pass setActivePage and setActiveCategory to Header */}
      <Header
        setActivePage={setActivePage}
        setActiveCategory={setActiveCategory}
      />

      {/* Render different components based on activePage */}
      {activePage === "home" && (
        <>
          <NewsSliderComponent />
          <CategoryList />
        </>
      )}
      {activePage === "latest" && <LatestNews />}

      {/* Render the SpecificCategory component when a category is clicked */}
      {activePage === "category" && (
        <SpecificCategory activeCategory={activeCategory} />
      )}
    </>
  );
}

export default App;
