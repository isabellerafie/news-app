import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // useSelector btkhallini a3mol access 3al state mn l store
import { useNavigate } from "react-router-dom";
import { getLatestNews } from "../api";
import { setLatestNews, setStatus, setError } from "../reducers/newsReducer";
import { Slider } from "@mui/material"; // Import MUI Slider

function NewsSlider() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newsItems = useSelector((state) => state.news.latestNews); // contains the latest news
  const error = useSelector((state) => state.news.error);
  const status = useSelector((state) => state.news.status);

  const [sliderValue, setSliderValue] = useState(0); // For controlling the slider value

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

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue); // Update the slider value
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
        {newsItems.slice(sliderValue, sliderValue + 1).map((newsItem) => (
          <div
            className="news-slide"
            key={newsItem.id}
            onClick={() => handleClick(newsItem.id)}
          >
            <img
              src={newsItem.image || "images.png"}
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

      <Slider //MUI Slider
        value={sliderValue}
        onChange={handleSliderChange}
        aria-labelledby="news-slider"
        min={0}
        max={4}
        step={1}
        marks={newsItems.map((_, index) => ({ value: index }))}
        valueLabelDisplay="auto"
      />
    </div>
  );
}

export default NewsSlider;
