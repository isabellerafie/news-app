import React, { useState } from "react";

function Header({ setActivePage, setActiveCategory }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const clearSearch = () => {
    setIsSearchVisible(false);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleCategoryClick = (category) => {
    setActivePage("category");
    setActiveCategory(category);
    setIsSidebarVisible(false); // Close the sidebar when a category is clicked
  };

  const mockData = [
    { category: "الصفحة الرئيسية", url: "/" },
    { category: "أبرز الأحداث", url: "/highlights" },
    { category: "اخبار محلية", url: "/local" },
    { category: "اقتصاد", url: "/economy" },
    { category: "مركزية شباب", url: "/youth" },
    { category: "متفرقات", url: "/various" },
    { category: "تحليل سياسي", url: "/political" },
    { category: "صحة", url: "/health" },
    { category: "الوضع العربي", url: "/arab" },
    { category: "دوليات", url: "/international" },
    { category: "عدل وأمن", url: "/justice" },
    { category: "مقالات", url: "/articles" },
    { category: "الصور", url: "/pictures" },
    { category: "الفيديوهات", url: "/videos" },
  ];

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
          />
        </div>
      )}

      {isSidebarVisible && (
        <aside className="sidebar">
          <ul>
            {mockData.map((item) => (
              <li key={item.category}>
                <a href="#" onClick={() => handleCategoryClick(item.category)}>
                  {item.category}
                </a>
              </li>
            ))}
          </ul>
          {/* Close Sidebar Icon */}
          <i className="fas fa-times close-sidebar" onClick={toggleSidebar}></i>
        </aside>
      )}
    </>
  );
}

export default Header;
