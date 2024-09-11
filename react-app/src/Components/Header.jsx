import React, { useState } from "react";

function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const clearSearch = () => {
    setIsSearchVisible(false);
  };

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const mockData = [
    { title: "الصفحة الرئيسية", url: "/" },
    { title: "أبرز الأحداث", url: "/highlights" },
    { title: "اخبار محلية", url: "/local" },
    { title: "اقتصاد", url: "/economy" },
    { title: "مركزية شباب", url: "/youth" },
    { title: "متفرقات", url: "/various" },
    { title: "تحليل سياسي", url: "/political" },
    { title: "صحة", url: "/health" },
    { title: "الوضع العربي", url: "/arab" },
    { title: "دوليات", url: "/international" },
    { title: "عدل وأمن", url: "/justice" },
    { title: "مقالات", url: "/articles" },
    { title: "الصور", url: "/pictures" },
    { title: "الفيديوهات", url: "/videos" },
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
          <button className="home">الرئيسية</button>
          <button className="latest">آخر الأخبار</button>
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
              <li key={item.title}>
                <a href={item.url}>{item.title}</a>
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
