import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCategories, searchArticles } from "../api";
import { AppBar, Button, IconButton, TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CircularProgress from "@mui/material/CircularProgress";
import Drawer from "@mui/material/Drawer";

function Header({ setActiveCategory }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [activePage, setActivePage] = useState("home");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    if (location.pathname === "/") {
      setActivePage("home");
    } else if (location.pathname === "/latest") {
      setActivePage("latest");
    } else {
      setActivePage("");
    }
  }, [location.pathname]);

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
    setIsSidebarVisible(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsLoading(true);
      searchArticles(searchQuery, 1)
        .then((response) => {
          setSearchResults(response.data.data);
          navigate("/search-results", {
            state: { searchQuery, searchResults: response.data.data },
          });
        })
        .catch((error) => {
          console.error("Error searching articles:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
      clearSearch();
    }
  };

  const handleHomeClick = () => {
    setActivePage("home");
    navigate("/");
    clearSearch();
  };

  const handleLatestClick = () => {
    setActivePage("latest");
    navigate("/latest");
    clearSearch();
  };

  const filteredCategories = Array.isArray(categories)
    ? categories.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const isOnSingleArticlePage = location.pathname.startsWith("/news-details");

  return (
    <>
      <AppBar //To replace the header and create a top navigation bar
        className={`header ${isSearchVisible ? "blur" : ""}`}
        sx={{ backgroundColor: "#00112f", transition: "margin 0.3s" }}
        style={{ marginLeft: isSidebarVisible ? 250 : 0 }} // Push content to the left
      >
        <div className="header__container">
          {isOnSingleArticlePage ? (
            <IconButton
              onClick={() => navigate(-1)}
              title="Back"
              color="inherit"
            >
              <ArrowBackIosIcon />
            </IconButton>
          ) : (
            <IconButton onClick={toggleSearch} color="inherit">
              <SearchIcon />
            </IconButton>
          )}

          <div className="header__logo">
            <img src="/src/assets/sync-logo.png" alt="Sync Logo" />
          </div>

          <IconButton onClick={toggleSidebar} color="inherit">
            {isSidebarVisible ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
        <br />
        {!isOnSingleArticlePage && (
          <div
            className={`button-container ${isSidebarVisible ? "margin" : ""}`}
          >
            <Button
              className={`home ${activePage === "home" ? "active" : ""}`}
              onClick={handleHomeClick}
            >
              الرئيسية
            </Button>
            <Button
              className={`latest ${activePage === "latest" ? "active" : ""}`}
              onClick={handleLatestClick}
            >
              آخر الأخبار
            </Button>
          </div>
        )}
      </AppBar>

      {isSearchVisible && (
        <div className="overlay visible" onClick={clearSearch}></div>
      )}
      {isSearchVisible && (
        <div className="search-container">
          <IconButton onClick={clearSearch} color="inherit">
            <CloseIcon />
          </IconButton>

          <TextField
            variant="outlined"
            placeholder="...اكتب شيئا"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyPress}
            slotProps={{
              htmlInput: {
                style: {
                  backgroundColor: "white", // Set background color to white
                  textAlign: "right", // Set text alignment to right
                },
              },
            }}
          />
        </div>
      )}

      {isLoading && (
        <div className="preloader-overlay">
          <div className="loading-indicator">
            <CircularProgress color="primary" /> {/* loading indicator */}
          </div>
        </div>
      )}

      <Drawer
        className="drawer"
        anchor="right"
        open={isSidebarVisible}
        onClose={toggleSidebar}
        variant="persistent"
      >
        <div className="sidebar-content" style={{ width: 250 }}>
          <IconButton onClick={toggleSidebar} color="inherit">
            <CloseIcon />
          </IconButton>
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
        </div>
      </Drawer>
    </>
  );
}

export default Header;
