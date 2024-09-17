import React, { useState, useEffect } from "react";
import { getLatestNews } from "../api"; // Import the API function

function NewsSlider() {
  const [newsItems, setNewsItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getLatestNews(1); // Fetch the first page
        setNewsItems(response.data.data); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Handle error
      }
    };

    fetchNews();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="news-slider-container">
      <div className="news-slider">
        {newsItems.map((newsItem) => (
          <div className="news-slide" key={newsItem.id}>
            {/* Display a placeholder image if image is null */}
            <img
              src={newsItem.image || "/src/assets/images.png"}
              alt={newsItem.category.title}
            />
            <div className="news-details">
              <div className="news-date-container">
                <span className="date-icon">🕘</span>
                <p className="news-date">
                  {new Date(newsItem.date).toLocaleDateString()}
                </p>
              </div>
              <h2 className="news-category">{newsItem.category.title}</h2>
              <p className="news-slogan">{newsItem.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsSlider;
