import React from "react";
import { useSelector } from "react-redux"; //useSelector btkhallini a3mol access 3al state mn l store
import { useNavigate } from "react-router-dom";
function NewsSlider() {
  const navigate = useNavigate();
  const newsItems = useSelector((state) => state.news.latestNews); //contains the latest news
  const error = useSelector((state) => state.news.error);
  const status = useSelector((state) => state.news.status);

  const handleClick = (id) => {
    navigate(`/news-details/${id}`);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="news-slider-container">
      <div className="news-slider">
        {newsItems.slice(0, 4).map((newsItem) => (
          <div
            className="news-slide"
            key={newsItem.id}
            onClick={() => handleClick(newsItem.id)}
          >
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
