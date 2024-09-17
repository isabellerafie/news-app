import React, { useState, useEffect } from "react";
import { getCategories, searchArticles } from "../api";

function Header({ setActivePage, setActiveCategory, onSearch }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]); // State to store categories
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  useEffect(() => {
    // Fetch categories from API
    getCategories()
      .then((response) => {
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

  const handleCategoryClick = (categoryId) => {
    const API_BASE_URL = "https://www.almarkazia.com/ar/api/news";

    console.log("Category ID:", categoryId); // Log the category ID
    console.log("API URL:", `${API_BASE_URL}/?category=${categoryId}`);
    setActivePage("category");
    setActiveCategory(categoryId);
    setIsSidebarVisible(false); // Close the sidebar when a category is clicked
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query as the user types
  };

  // Detect 'Enter' key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchArticles(searchQuery, 1)
        .then((response) => {
          console.log("Search results:", response.data);
          setSearchResults(response.data.data); // Store the search results
          if (onSearch) {
            onSearch(response.data.data); // Pass the results to parent if needed
          }
        })
        .catch((error) => {
          console.error("Error searching articles:", error);
        });

      clearSearch(); // Clear the search after the search is submitted
    }
  };

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
                <li key={item.id}>
                  <a href="#" onClick={() => handleCategoryClick(item.id)}>
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

      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="search-results-container">
          {searchResults.map((article) => (
            <div key={article.id} className="search-result-item">
              <h3>{article.title}</h3>
              <p>{article.date}</p>
              <img
                src={article.image || "/src/assets/images.png"}
                alt={article.title}
                onError={(e) => (e.target.src = "/src/assets/images.png")}
              ></img>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Header;
