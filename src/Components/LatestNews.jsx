import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLatestNews } from "../api";

function LatestNews() {
  const [latestNews, setLatestNews] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadNews(pageNum);
  }, [pageNum]);

  const loadNews = (page) => {
    setIsLoading(true); // Set loading to true when fetching new data
    getLatestNews(page)
      .then((response) => {
        const newNews = response.data.data;

        if (newNews.length === 0) {
          setHasMore(false); // No more news to load
        } else {
          setLatestNews((prevNews) => [...prevNews, ...newNews]);
        }
        setIsLoading(false); // Data has finished loading
      })
      .catch((err) => {
        console.error("Failed to fetch latest news:", err);
        setIsLoading(false);
      });
  };

  const handleClick = (id) => {
    navigate(`/news-details/${id}`);
  };

  const handleLoadMore = () => {
    setPageNum((prevPageNum) => prevPageNum + 1);
  };

  return (
    <div className="latest-list">
      {latestNews.length === 0 && isLoading && (
        <p>Loading latest news...</p> // Display loading indicator
      )}

      {latestNews.map((latestItem, index) => (
        <div
          className="latest-item"
          key={`${latestItem.id}-${index}`}
          onClick={() => handleClick(latestItem.id)}
        >
          <img
            src={latestItem.image || "/src/assets/images.png"}
            alt={latestItem.title}
            onError={(e) => (e.target.src = "/src/assets/images.png")}
          />
          <div className="latest-details">
            <h2 className="latest-title">{latestItem.title}</h2>
            <div className="line">
              <p className="latest-date">{latestItem.date}</p>
              <h4 className="latest-category">{latestItem.category.title}</h4>
            </div>
          </div>
        </div>
      ))}

      {/* Conditionally show Load More button at the bottom if not loading and news exist */}
      {!isLoading && latestNews.length > 0 && hasMore && (
        <div className="load-more-wrapper">
          <button className="load-more" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default LatestNews;
