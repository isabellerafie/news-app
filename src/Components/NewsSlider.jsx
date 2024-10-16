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
    <div className="news-slider-container" style={{ overflowX: "hidden" }}>
      <div className="news-slider">
        {newsItems.slice(sliderValue, sliderValue + 1).map((newsItem) => (
          <div
            className="news-slide"
            key={newsItem.id}
            onClick={() => handleClick(newsItem.id)}
          >
            <img
              src={newsItem.image || "/images.png"}
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
      <Slider //MUI slider
        value={sliderValue}
        onChange={handleSliderChange}
        aria-labelledby="news-slider"
        min={0}
        max={4}
        step={1} // Step interval between slider values
        marks={newsItems.map((_, index) => ({ value: index }))}
        valueLabelDisplay="auto" // Shows the value label when hovering over the thumb
        sx={{
          color: "#ffff", // Primary color of the slider
          mt: -3, //marginTop
          height: 12,
          "& .MuiSlider-thumb": {
            // Styles for the slider thumb (the draggable part)
            height: 10,
            width: 60,
            backgroundColor: "#00112f",
            border: "2px solid #00112f",
            borderRadius: "0",
            "&:hover, &.Mui-focusVisible, &.Mui-active": {
              // Style when thumb is hovered, focused, or active
              boxShadow: "none", // Removes the default shadow
            },
          },
          "& .MuiSlider-track": {
            // Styles for the track (the filled part of the slider)
            height: 0, // Track height
            backgroundColor: "#ffff", // Color of the track
          },
          "& .MuiSlider-rail": {
            // Styles for the rail (the unfilled part of the slider)
            height: 10, // Rail height
            backgroundColor: "#ffff", // Light color for the rail
          },
          "& .MuiSlider-mark": {
            // Styles for the slider marks (small dots/ticks along the track)
            height: 0, // Mark height
          },
          "& .MuiSlider-markActive": {
            // Styles for the marks that are active/selected
            backgroundColor: "#acacac", // Active mark color
          },
        }}
      />
    </div>
  );
}

export default NewsSlider;
