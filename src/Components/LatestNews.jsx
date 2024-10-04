import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLatestNews } from "../api";
import { setLatestNews, setStatus, setError } from "../reducers/newsReducer";
import {
  Grid2,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component"; // Import LazyLoadImage component
import "react-lazy-load-image-component/src/effects/blur.css"; // Optional: adds a blur effect when loading

function LatestNews() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const latestNews = useSelector((state) => state.news.latestNews);
  const status = useSelector((state) => state.news.status);
  const error = useSelector((state) => state.news.error);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (pageNum === 1 && latestNews.length === 0) {
      dispatch(setStatus("loading"));
    }

    if (!hasMore && pageNum > 1) {
      return;
    }

    getLatestNews(pageNum)
      .then((response) => {
        const newNews = response.data.data;
        if (newNews.length === 0) {
          setHasMore(false);
        } else {
          const combinedNews = [...latestNews, ...newNews];
          const uniqueNews = Array.from(
            new Set(combinedNews.map((item) => item.id))
          ).map((id) => combinedNews.find((item) => item.id === id));

          dispatch(setLatestNews(uniqueNews));
        }
        dispatch(setStatus("succeeded"));
      })
      .catch((err) => {
        dispatch(setError(err.message));
        dispatch(setStatus("failed"));
      });
  }, [dispatch, pageNum, latestNews, hasMore]);

  const handleClick = (id) => {
    navigate(`/news-details/${id}`);
  };

  const handleLoadMore = (event) => {
    event.preventDefault();
    setPageNum((prevPageNum) => prevPageNum + 1);
  };

  if (status === "loading") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="latest-list">
      <Grid2 container spacing={0}>
        {latestNews.map((latestItem, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={`${latestItem.id}-${index}`}>
            <Card
              className="latest-item"
              onClick={() => handleClick(latestItem.id)}
              style={{ width: "100%" }}
            >
              {/* Lazy load images */}
              <LazyLoadImage
                alt={latestItem.title}
                effect="blur"
                src={latestItem.image || "/images.png"} // Fallback image
                height="100px"
                onError={(e) => (e.target.src = "/images.png")} // Handle error by setting a fallback image
              />
              <CardContent className="latest-details">
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                  }}
                  className="latest-title"
                >
                  {latestItem.title}
                </Typography>
                <div className="line">
                  <Typography className="latest-date">
                    {new Date(latestItem.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle2" className="latest-category">
                    {latestItem.category.title}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {hasMore && (
        <div className="load-more-wrapper">
          <Button
            className="load-more"
            variant="contained"
            onClick={handleLoadMore}
            sx={{
              margin: "20px auto",
              padding: "10px 20px",
              fontSize: "16px",
              color: "#fff",
              backgroundColor: "#00112f",
              borderRadius: "5px",
            }}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

export default LatestNews;
