import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../api";
import {
  Paper,
  Typography,
  Grid2,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Share as ShareIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";

function SingleNewsArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [fontSize, setFontSize] = useState(16); // Default font size
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); // Set loading to true when fetching article
    getSingleArticle(id)
      .then((response) => {
        if (response.data.data.length > 0) {
          setArticle(response.data.data[0]);
        } else {
          setArticle(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching article details:", error);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false after fetch
      });
  }, [id]);

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date as MM/DD/YYYY
  };

  // Function to handle sharing
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.description,
          url: window.location.href, // Share the current URL
        })
        .then(() => console.log("Share successful"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  // Functions to increase/decrease font size
  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2); // Increase font size by 2px
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => Math.max(prevSize - 2, 12)); // Decrease font size by 2px, but not below 12px
  };

  return (
    <div className="single-news-article">
      {isLoading ? (
        <div className="preloader-overlay">
          <CircularProgress className="loading-indicator" />
        </div>
      ) : article ? (
        <Paper className="article-details" elevation={3}>
          <img
            src={article.image || "/images.png"}
            alt={article.title}
            onError={(e) => (e.target.src = "/images.png")}
          />
          <div className="article-info-row">
            <Typography className="article-date" sx={{ marginTop: "6px" }}>
              {formatDate(article.date)}
            </Typography>
            <Grid2
              container
              justifyContent="flex-end"
              className="article-icons"
            >
              <IconButton onClick={handleShare} aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton
                onClick={decreaseFontSize}
                aria-label="decrease font size"
              >
                <RemoveIcon />
              </IconButton>
              <IconButton
                onClick={increaseFontSize}
                aria-label="increase font size"
              >
                <AddIcon />
              </IconButton>
            </Grid2>
            <Typography className="category-label">
              {article.category.title}
            </Typography>
          </div>
          <hr />
          <Typography
            variant="h4"
            className="article-title"
            sx={{ fontSize: "1.5em" }}
          >
            {article.title}
          </Typography>
          <div
            className="article-content"
            style={{ fontSize: `${fontSize}px` }}
            dangerouslySetInnerHTML={{ __html: article.content }} //ta ma ytla3lna html tags bi aleb l text
          />
        </Paper>
      ) : (
        <Typography>No article found</Typography>
      )}
    </div>
  );
}

export default SingleNewsArticle;
