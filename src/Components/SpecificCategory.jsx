import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getArticlesByCategory } from "../api";
import {
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function SpecificCategory({ activeCategory }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await getArticlesByCategory(activeCategory);
        setArticles(response.data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchArticles();
  }, [activeCategory]);

  const handleArticleClick = (id) => {
    navigate(`/news-details/${id}`); // Navigate to the Single News Article Page
  };

  return (
    <div className="specific-category-page">
      <Typography variant="h4">{activeCategory}</Typography>
      {isLoading ? ( // Show preloader while loading
        <div className="preloader">
          <CircularProgress />
        </div>
      ) : articles.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {/* First news on its own */}
            <Grid item xs={12}>
              <Card
                className="main-news"
                onClick={() => handleArticleClick(articles[0].id)}
              >
                <LazyLoadImage
                  alt={articles[0].title}
                  effect="blur"
                  src={articles[0].image || "/images.png"}
                  className="main-news-image"
                  onError={(e) => (e.target.src = "/images.png")}
                  height="250px"
                  width="100%"
                  style={{ objectFit: "cover" }}
                />
                <CardContent>
                  <div className="main-news-info">
                    <Typography className="snews-date">
                      🕘 {new Date(articles[0].date).toLocaleTimeString()}
                    </Typography>
                    <Typography className="snews-category">
                      {articles[0].category.title}
                    </Typography>
                  </div>
                  <Typography
                    variant="h5"
                    className="main-news-title"
                    sx={{
                      marginTop: "220px",
                      color: "#ffffff",
                      textAlign: "center",
                      fontSize: "0.8em",
                      position: "relative",
                    }}
                  >
                    {articles[0].title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Other news in rows of two */}
            <Grid container spacing={2}>
              {articles.slice(1).map((article) => (
                <Grid item xs={6} key={article.id}>
                  <Card
                    className="news-item"
                    onClick={() => handleArticleClick(article.id)}
                    sx={{ paddingLeft: "0" }}
                  >
                    <LazyLoadImage
                      alt={article.title}
                      effect="blur"
                      src={article.image || "/images.png"}
                      className="news-item-image"
                      onError={(e) => (e.target.src = "/images.png")}
                      height="200px"
                      width="100%"
                      style={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <div className="news-item-info">
                        <div className="news-item-date">
                          🕘{new Date(article.date).toLocaleDateString()}
                        </div>
                        <Typography className="news-item-category">
                          {article.category.title}
                        </Typography>
                      </div>
                      <Typography
                        variant="h6"
                        className="news-item-title"
                        sx={{
                          fontSize: "0.8em",
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1, // Limit to 1 line
                        }}
                      >
                        {article.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      ) : (
        <p className="no-news">No news available</p>
      )}
    </div>
  );
}

export default SpecificCategory;
