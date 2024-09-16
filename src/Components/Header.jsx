import React, { useState, useEffect } from "react";
import { getCategories } from "../api";

function Header({ setActivePage, setActiveCategory, onSearch }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]); // State to store categories

  useEffect(() => {
    // Fetch categories from API
    getCategories()
      .then((response) => {
        // Log the response to check its structure
        console.log("API response:", response);
        if (response.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data); // Update state with the categories array
        } else {
          console.error("Unexpected response data:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const clearSearch = () => {
    setIsSearchVisible(false);
    setSearchQuery("");
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleCategoryClick = (category) => {
    setActivePage("category");
    setActiveCategory(category);
    setIsSidebarVisible(false); // Close the sidebar when a category is clicked
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query as the user types
    if (onSearch) {
      onSearch(event.target.value); // Optionally pass the search query to a parent component or perform filtering
    }
  };

  // Detect 'Enter' key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (onSearch) {
        onSearch(searchQuery); // Pass the search query to display the results
      }
      clearSearch(); // Clear the search after the search is submitted
    }
  };

  // const mockData = [
  //   { category: "الصفحة الرئيسية", url: "/" },
  //   { category: "أبرز الأحداث", url: "/highlights" },
  //   { category: "اخبار محلية", url: "/local" },
  //   { category: "اقتصاد", url: "/economy" },
  //   { category: "مركزية شباب", url: "/youth" },
  //   { category: "متفرقات", url: "/various" },
  //   { category: "تحليل سياسي", url: "/political" },
  //   { category: "صحة", url: "/health" },
  //   { category: "الوضع العربي", url: "/arab" },
  //   { category: "دوليات", url: "/international" },
  //   { category: "عدل وأمن", url: "/justice" },
  //   { category: "مقالات", url: "/articles" },
  //   { category: "الصور", url: "/pictures" },
  //   { category: "الفيديوهات", url: "/videos" },
  // ];

  // Filtering categories based on search query
  const filteredCategories = Array.isArray(categories)
    ? categories.filter(
        (item) =>
          item.title &&
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <header className={`header ${isSearchVisible ? "blur" : ""}`}>
        <div className="header__container">
          {/* Search Icon (on the left side) */}
          <i
            className="fas fa-search header__icon-left"
            onClick={toggleSearch}
          ></i>
          {/* Logo (in the middle) */}
          <div className="header__logo">
            <img src="/src/assets/sync-logo.png" alt="Sync Logo" />
          </div>
          {/* Menu Icon (on the right side) */}
          {isSidebarVisible ? (
            <i
              className="fas fa-times header__icon-right"
              onClick={toggleSidebar}
            ></i>
          ) : (
            <i
              className="fas fa-bars header__icon-right"
              onClick={toggleSidebar}
            ></i>
          )}
        </div>
        <br />
        <div className="button-container">
          <button className="home" onClick={() => setActivePage("home")}>
            الرئيسية
          </button>
          <button className="latest" onClick={() => setActivePage("latest")}>
            آخر الأخبار
          </button>
        </div>
      </header>

      {/* Overlay */}
      {isSearchVisible && (
        <div className="overlay visible" onClick={clearSearch}></div>
      )}
      {/* Search Input */}
      {isSearchVisible && (
        <div className="search-container">
          <i
            className="fas fa-times search-clear-icon"
            onClick={clearSearch}
          ></i>
          <input
            type="text"
            placeholder="...اكتب شيئا"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
      )}

      {isSidebarVisible && (
        <aside className="sidebar">
          <ul>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((item) => (
                <li key={item.title}>
                  <a href="#" onClick={() => handleCategoryClick(item.title)}>
                    {item.title}
                  </a>
                </li>
              ))
            ) : (
              <li>No categories found</li>
            )}
          </ul>
          {/* Close Sidebar Icon */}
          <i className="fas fa-times close-sidebar" onClick={toggleSidebar}></i>
        </aside>
      )}
    </>
  );
}

export default Header;
