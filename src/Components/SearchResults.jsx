import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchArticles } from "../api";
import {
  Container,
  Grid2,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchQuery, searchResults: initialResults } = location.state || {
    searchQuery: "", // Default empty query
    searchResults: [],
  };

  const [searchResults, setSearchResults] = useState(initialResults);
  const [page, setPage] = useState(2); // Start from page 2 for loading more
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [noMoreResults, setNoMoreResults] = useState(false); // To check if there are no more results

  const handleResultClick = (articleId) => {
    navigate(`/news-details/${articleId}`);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    searchArticles(searchQuery, page) // Fetch more results with the current page
      .then((response) => {
        const newResults = response.data.data;

        if (newResults.length > 0) {
          // Filter out any articles that are already in the searchResults
          const filteredResults = newResults.filter(
            (newArticle) =>
              !searchResults.some(
                (existingArticle) => existingArticle.id === newArticle.id
              )
          );

          if (filteredResults.length > 0) {
            setSearchResults((prevResults) => [
              ...prevResults,
              ...filteredResults,
            ]); // Append only new unique results
            setPage((prevPage) => prevPage + 1); // Increment the page for the next load
          } else {
            setNoMoreResults(true); // If no new unique results, set no more results
          }
        } else {
          setNoMoreResults(true); // No more results to load
        }
      })
      .catch((error) => {
        console.error("Error loading more articles:", error);
      })
      .finally(() => {
        setIsLoadingMore(false); // Stop loading indicator
      });
  };

  return (
    <Container className="search-results-container">
      {searchResults.length > 0 ? (
        <Grid2 container spacing={0}>
          {searchResults.map((article, index) => (
            <Grid2 item xs={12} sm={6} md={4} key={`${article.id}-${index}`}>
              <Card
                className="latest-item"
                onClick={() => handleResultClick(article.id)}
                style={{ cursor: "pointer" }}
              >
                <LazyLoadImage
                  alt={article.title}
                  effect="blur"
                  src={article.image || "/images.png"}
                  height="200px"
                  onError={(e) => (e.target.src = "/images.png")}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    height: "fit-content",
                    marginTop: "40px",
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    className="latest-title"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {article.title}
                  </Typography>
                  <div className="line">
                    <Typography className="latest-date">
                      {new Date(article.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="subtitle2" className="latest-category">
                      {article.category.title}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Typography variant="h6" align="center">
          No results found.
        </Typography>
      )}

      {/* Load More Button */}
      {!noMoreResults && (
        <div className="load-more-wrapper">
          <Button
            className="load-more"
            variant="contained"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            sx={{
              margin: "20px auto",
              padding: "10px 20px",
              fontSize: "16px",
              color: "#fff",
              backgroundColor: "#00112f",
              borderRadius: "5px",
              display: "flex",
            }}
          >
            {isLoadingMore ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}

      {/* No More Results Message */}
      {noMoreResults && (
        <Typography variant="body1" align="center">
          No more results to load.
        </Typography>
      )}
    </Container>
  );
}

export default SearchResults;
