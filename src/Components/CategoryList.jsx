import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, getArticlesByCategory } from "../api";
import {
  Container,
  Grid2,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component"; // Import LazyLoadImage component
import "react-lazy-load-image-component/src/effects/blur.css"; // Optional: adds a blur effect when loading

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoriesAndArticles = async () => {
      try {
        const categoryResponse = await getCategories();
        const categoriesData = categoryResponse.data.data.slice(0, 4); // Get the first 4 categories
        setCategories(categoriesData);

        const articlesData = {};
        for (const category of categoriesData) {
          const articlesResponse = await getArticlesByCategory(category.id);
          articlesData[category.id] = articlesResponse.data.data.slice(0, 2); // Get the first 2 articles for each category
        }
        setArticles(articlesData);
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    fetchCategoriesAndArticles();
  }, []);

  const handleClick = (id) => {
    navigate(`/news-details/${id}`); // Navigate to Single News Article Page
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container
      className="categories-container"
      sx={{
        marginLeft: "-52px",
        width: "105vw",
        paddingLeft: "20px",
        paddingRight: "20px",
        overflowX: "hidden", // Prevent horizontal scrolling
        overflowY: "hidden",
        backgroundColor: "#eeeeee",
      }}
    >
      <Grid2 container spacing={4}>
        {categories.map((category) => (
          <Grid2
            item
            xs={12}
            sm={6}
            md={3}
            key={category.id}
            className="category"
          >
            <Typography
              variant="h6"
              sx={{ fontSize: "1.0rem" }}
              className="category-name"
            >
              {category.title}
            </Typography>
            <Grid2 container spacing={0.1}>
              {articles[category.id]?.map((item) => (
                <Grid2 item xs={12} key={item.id} className="news-item">
                  <Card
                    onClick={() => handleClick(item.id)}
                    className="news-card"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      borderRadius: 0,
                      boxShadow: "none",
                    }}
                  >
                    {/* Lazy load images */}
                    <LazyLoadImage
                      alt={item.title}
                      effect="blur" // adds a blur effect while loading
                      src={item.image || "/images.png"} // Fallback image
                      width="100%"
                      style={{
                        height: "120px",
                        objectFit: "cover", // Ensures the image covers the container without stretching
                      }}
                      onError={(e) => (e.target.src = "/images.png")} // Handle image load errors
                    />

                    <CardContent>
                      <div
                        className="news-info"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "8px",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.8rem",
                            color: "#00112f",
                            marginTop: "4px",
                            marginLeft: "-15px",
                          }}
                          className="newss-date"
                        >
                          🕘{new Date(item.date).toISOString().substring(0, 10)}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: "0.75rem" }}
                          className="name"
                        >
                          {category.title}
                        </Typography>
                      </div>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "0.95rem",
                          fontWeight: "900",
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3, // Limit to 3 lines
                          direction: "rtl",
                          marginRight: "-10px",
                        }}
                        className="news-title"
                      >
                        {item.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}

export default CategoryList;
