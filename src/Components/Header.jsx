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
    } else if (location.pathname.startsWith("/category")) {
      setActivePage("category");
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
    setIsSidebarVisible(false); // Close the sidebar
  };

  const handleLatestClick = () => {
    setActivePage("latest");
    navigate("/latest");
    clearSearch();
  };

  const isOnSingleArticlePage = location.pathname.startsWith("/news-details");
  const isOnSearchResultsPage = location.pathname === "/search-results";
  const isOnCategoryPage = location.pathname.startsWith("/category");

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
        <div className="header__container">
          {isOnSingleArticlePage ||
          isOnSearchResultsPage ||
          isOnCategoryPage ? ( //show back button if on these pages
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

          {/* Display close icon instead of menu icon when sidebar is open */}
          {isSidebarVisible ? (
            <IconButton onClick={toggleSidebar} color="inherit">
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton onClick={toggleSidebar} color="inherit">
              <MenuIcon />
            </IconButton>
          )}
        </div>

        {!isOnSingleArticlePage &&
          !isOnSearchResultsPage &&
          !isOnCategoryPage && ( //hide these 2 buttons on these pages
            <div
              className={`button-container`}
              style={{
                transform: isSidebarVisible
                  ? "translateX(-240px)"
                  : "translateX(0)",
                transition: "transform 0.3s ease-in-out", // Smooth transition
              }}
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
                اخر الأخبار
              </Button>
            </div>
          )}
      </AppBar>

      {isSearchVisible && (
        <div className="overlay visible" onClick={clearSearch}></div>
      )}
      {isSearchVisible && (
        <div className="search-container">
          <IconButton onClick={clearSearch} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>

          <TextField //input field for search
            variant="outlined"
            placeholder="...اكتب شيئا"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyPress}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#838282", // border of the input field.
                "& input": {
                  color: "#838282", //  input text color
                },
              },
            }}
            slotProps={{
              htmlInput: {
                style: {
                  backgroundColor: "#d8d5d5",
                  textAlign: "right",
                  width: "100vw",
                },
              },
            }}
          />
        </div>
      )}

      {isLoading && (
        <div className="preloader-overlay">
          <div className="loading-indicator">
            <CircularProgress color="primary" />
            {/* loading indicator */}
          </div>
        </div>
      )}

      {!isLoading && (
        <Drawer //sidebar
          anchor="right"
          open={isSidebarVisible}
          onClose={toggleSidebar}
          PaperProps={{
            sx: { backgroundColor: "#00112f", marginTop: "60px" },
          }}
        >
          <div className="sidebar-content">
            <ul>
              <li>
                <div
                  onClick={handleHomeClick}
                  style={{
                    cursor: "pointer",
                    color: "#ffffff",
                    marginBottom: "15px",
                    marginRight: "50px",
                  }}
                >
                  الصفحة الرئيسية
                </div>
              </li>
              {categories.length > 0 ? (
                categories.map((item) => (
                  <li key={item.id}>
                    <div
                      onClick={() => handleCategoryClick(item.id)}
                      style={{
                        cursor: "pointer",
                        color: "#ffffff",
                        marginTop: "25px",
                        marginRight: "50px",
                      }}
                    >
                      {item.title}
                    </div>
                  </li>
                ))
              ) : (
                <li>No categories found</li>
              )}
            </ul>
          </div>
        </Drawer>
      )}
    </>
  );
}

export default Header;
