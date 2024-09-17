import React, { useState, useEffect } from "react";
import { getLatestNews } from "../api";
function LatestNews() {
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    getLatestNews(1)
      .then((response) => {
        setLatestNews(response.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch latest news:", err);
      });
  }, []);
  return (
    <div className="latest-list">
      {latestNews.map((latestItem) => (
        <div className="latest-item" key={latestItem.id}>
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
    </div>
  );
}

export default LatestNews;
