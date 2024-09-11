import React, { useState } from "react";

function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const clearSearch = () => {
    setIsSearchVisible(false);
  };

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
          <i className="fas fa-bars header__icon-right"></i>
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
    </>
  );
}

export default Header;
