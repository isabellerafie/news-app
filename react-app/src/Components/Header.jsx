function Header() {
  return (
    <header className="header">
      <div className="header__container">
        {/* Search Icon (on the left side) */}
        <i className="fas fa-search header__icon-left"></i>
        {/* Logo (in the middle) */}
        <div className="header__logo">
          <img src="/src/assets/sync-logo.png" alt="Sync Logo" />
        </div>
        {/* Menu Icon (on the right side) */}
        <i className="fas fa-bars header__icon-right"></i>
        {/* Menu (three dashes) icon */}
      </div>
      <br />
      <div className="button-container">
        <button className="home">الرئيسية</button>
        <button className="latest">آخر الأخبار</button>
      </div>
    </header>
  );
}

export default Header;
