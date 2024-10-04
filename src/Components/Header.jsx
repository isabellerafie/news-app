import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCategories, searchArticles } from "../api";
import { AppBar, Button, IconButton, TextField, Alert } from "@mui/material";
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
  const [timeoutError, setTimeoutError] = useState(false); // Add state for timeout error

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

  useEffect(() => {
    if (timeoutError) {
      const timer = setTimeout(() => {
        setTimeoutError(false); // Clear the alert after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer when component unmounts
    }
  }, [timeoutError]);

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
          if (error.code === "ECONNABORTED") {
            setTimeoutError(true); // Set error state on timeout
          } else {
            console.error("Error searching articles:", error);
          }
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
  const isOnSearchResultsPage = location.pathname === "/search-results"; // Check if on search results page

  return (
    <>
      {timeoutError && ( // Conditionally render the timeout alert
        <Alert
          severity="error"
          onClose={() => setTimeoutError(false)} // Close alert on click
          sx={{
            position: "fixed",
            top: "0",
            width: "100%",
            zIndex: 2000, // Ensure the alert is on top
          }}
        >
          Search request timed out. Please try again.
        </Alert>
      )}

      <AppBar //to replace the header
        className={`header ${isSearchVisible ? "blur" : ""}`}
        sx={{ backgroundColor: "#00112f" }}
      >
        <div
          className={`header__container ${
            isSidebarVisible ? "shift-left" : ""
          }`}
        >
          {isOnSingleArticlePage || isOnSearchResultsPage ? ( // Show back button if on a single article or search results page
            <IconButton //for icons
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
            <img src="sync-logo.png" alt="Sync Logo" />
          </div>

          <IconButton onClick={toggleSidebar} color="inherit">
            <MenuIcon />
          </IconButton>
        </div>

        {!isOnSingleArticlePage &&
          !isOnSearchResultsPage && ( // Hide buttons on article or search results page
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

          <TextField //input field for search
            variant="outlined"
            placeholder="...اكتب شيئا"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyPress}
            slotProps={{
              htmlInput: {
                style: {
                  backgroundColor: "white",
                  textAlign: "right",
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

      {!isLoading && (
        <>
          <Drawer //sidebar
            anchor="right"
            open={isSidebarVisible}
            onClose={toggleSidebar}
            PaperProps={{
              sx: { backgroundColor: "#00112f" },
            }}
          >
            <div className="sidebar-content">
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
      )}
    </>
  );
}

export default Header;
