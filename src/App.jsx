import "./App.css";
import CategoryList from "./Components/CategoryList";
import Header from "./Components/Header";
import LatestNews from "./Components/LatestNews";
import NewsSliderComponent from "./Components/NewsSlider";
import React, { useState } from "react";

function App() {
  const [activePage, setActivePage] = useState("home"); // Track active page

  return (
    <>
      <Header setActivePage={setActivePage} />
      {activePage === "home" && ( //eza kabas home render these components
        <>
          <NewsSliderComponent />
          <CategoryList />
        </>
      )}
      {activePage === "latest" && <LatestNews />}
    </>
  );
}

export default App;
