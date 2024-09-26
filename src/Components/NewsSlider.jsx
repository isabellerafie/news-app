import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; //useSelector btkhallini a3mol access 3al state mn l store
import { useNavigate } from "react-router-dom";
import { getLatestNews } from "../api";
import { setLatestNews, setStatus, setError } from "../reducers/newsReducer";

function NewsSlider() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newsItems = useSelector((state) => state.news.latestNews); //contains the latest news
  const error = useSelector((state) => state.news.error);
  const status = useSelector((state) => state.news.status);

  useEffect(() => {
    if (newsItems.length === 0) {
      dispatch(setStatus("loading"));
      getLatestNews(1) // Fetch the latest news when NewsSlider mounts
        .then((response) => {
          dispatch(setLatestNews(response.data.data));
          dispatch(setStatus("succeeded"));
        })
        .catch((err) => {
          dispatch(setError(err.message));
          dispatch(setStatus("failed"));
        });
    }
  }, [dispatch, newsItems]);

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
