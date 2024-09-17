import React, { useState, useEffect } from "react";
import { getLatestNews } from "../api";

function NewsSlider() {
  const [newsItems, setNewsItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getLatestNews(1);
        setNewsItems(response.data.data);
      } catch (err) {
        setError(err.message);
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
