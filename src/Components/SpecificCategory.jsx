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

  const hasImage = articles[0]?.image && articles[0].image !== "/images.png";

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
                sx={{ marginBottom: hasImage ? "-35px" : "-15px" }} // Adjust margin based on image presence
              >
                <LazyLoadImage
                  alt={articles[0].title}
                  effect="blur"
                  src={articles[0].image || "/images.png"}
                  className="main-news-image"
                  onError={(e) => (e.target.src = "/images.png")}
                  height="150px"
                  width="100%"
                  style={{ objectFit: "cover" }}
                />
                <CardContent>
                  <div className="main-news-info">
                    <Typography
                      className="snews-date"
                      sx={{
                        marginLeft: "-7px",
                        marginTop: "20px",
                        fontSize: "12px",
                      }}
                    >
                      🕘{" "}
                      {new Date(articles[0].date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </Typography>
                    <Typography
                      className="snews-category"
                      sx={{
                        marginRight: "-5px",
                        fontWeight: "900",
                        marginTop: "18px",
                        fontSize: "12px",
                      }}
                    >
                      {articles[0].category.title}
                    </Typography>
                  </div>
                  <Typography
                    variant="h5"
                    className="main-news-title"
                    sx={{
                      marginTop: "165px",
                      color: "#ffffff",
                      direction: "rtl",
                      fontSize: "22px",
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2, // Limit to 2 lines
                      justifyContent: "end",
                      textAlign: "right",
                      overflowWrap: "break-word",
                      fontWeight: "200",
                      position: "relative",
                      marginBottom: "-20px",
                    }}
                  >
                    {articles[0].title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Other news in rows of two */}
            <Grid
              container
              spacing={1}
              className="othernews"
              sx={{
                marginTop: "30px",
              }}
            >
              {articles.slice(1).map((article) => (
                <Grid item xs={6} key={article.id}>
                  <Card
                    className="news-item"
                    onClick={() => handleArticleClick(article.id)}
                    sx={{ padding: "0", borderRadius: "0", boxShadow: "none" }}
                  >
                    <LazyLoadImage
                      alt={article.title}
                      effect="blur"
                      src={article.image || "/images.png"}
                      className="news-item-image"
                      onError={(e) => (e.target.src = "/images.png")}
                      height="80px"
                      width="100%"
                      style={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <div className="news-item-info">
                        <div className="news-item-date">
                          🕘{new Date(article.date).toISOString().split("T")[0]}
                        </div>
                        <Typography
                          className="news-item-category"
                          sx={{
                            fontSize: "10px",
                            marginRight: "-13px",
                          }}
                        >
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
                          WebkitLineClamp: 2, // Limit to 2 lines
                          position: "relative",
                          direction: "rtl",
                          justifyContent: "end",
                          textAlign: "right",
                          overflowWrap: "break-word",
                          fontWeight: "900",
                          marginTop: "3px",
                          marginRight: "-10px",
                          color: "black",
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
