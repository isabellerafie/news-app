import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, searchArticles } from "../api";

function Header({ setActiveCategory, onSearch }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
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
    setSearchResults([]);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    navigate(`/category/${categoryId}`);
    clearSearch();
    setIsSidebarVisible(false); // Close the sidebar
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchArticles(searchQuery, 1)
        .then((response) => {
          setSearchResults(response.data.data);
          if (onSearch) {
            onSearch(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error searching articles:", error);
        });
      clearSearch(); // Clear search after the search is submitted
    }
  };

  const handleHomeClick = () => {
    navigate("/");
    clearSearch();
  };

  const handleLatestClick = () => {
    navigate("/latest");
    clearSearch();
  };

  const filteredCategories = Array.isArray(categories)
    ? categories.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <header className={`header ${isSearchVisible ? "blur" : ""}`}>
        <div className="header__container">
          <i
            className="fas fa-search header__icon-left"
            onClick={toggleSearch}
          ></i>
          <div className="header__logo">
            <img src="/src/assets/sync-logo.png" alt="Sync Logo" />
          </div>
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
          <button className="home" onClick={handleHomeClick}>
            الرئيسية
          </button>
          <button className="latest" onClick={handleLatestClick}>
            آخر الأخبار
          </button>
        </div>
      </header>

      {isSearchVisible && (
        <div className="overlay visible" onClick={clearSearch}></div>
      )}
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
          <i className="fas fa-times close-sidebar" onClick={toggleSidebar}></i>
        </aside>
      )}

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
