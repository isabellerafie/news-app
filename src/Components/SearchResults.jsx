import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchArticles } from "../api";

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
          setSearchResults((prevResults) => [...prevResults, ...newResults]); // Append new results to the existing ones
          setPage((prevPage) => prevPage + 1); // Increment the page for the next load
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
    <div>
      {searchResults.length > 0 ? (
        <div className="search-results-container">
          {searchResults.map((article) => (
            <div
              key={article.id}
              className="latest-item"
              onClick={() => handleResultClick(article.id)}
            >
              <img
                src={article.image || "/src/assets/images.png"}
                alt={article.title}
                onError={(e) => (e.target.src = "/src/assets/images.png")}
              />
              <div className="latest-details">
                <h2 className="latest-title">{article.title}</h2>
                <div className="line">
                  <p className="latest-date">{article.date}</p>
                  <h4 className="latest-category">{article.category.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}

      {/* Load More Button */}
      {!noMoreResults && (
        <div className="load-more-wrapper">
          <button
            className="load-more"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {/* No More Results Message */}
      {noMoreResults && <p>No more results to load.</p>}
    </div>
  );
}

export default SearchResults;
