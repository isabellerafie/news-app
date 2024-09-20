import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getArticlesByCategory } from "../api";

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
      <h1>{activeCategory}</h1>
      {isLoading ? ( // Show preloader while loading
        <div className="preloader">
          <p>Loading articles...</p>
        </div>
      ) : articles.length > 0 ? (
        <>
          <div
            className="main-news"
            onClick={() => handleArticleClick(articles[0].id)}
          >
            <div className="main-news-info">
              <p className="snews-date">
                🕘 {new Date(articles[0].date).toLocaleTimeString()}
              </p>
              <p className="snews-category">{articles[0].category.title}</p>
            </div>
            <img
              src={articles[0].image || "/src/assets/images.png"}
              alt={articles[0].title}
              className="main-news-image"
              onError={(e) => (e.target.src = "/src/assets/images.png")}
            />
            <h2 className="main-news-title">{articles[0].title}</h2>
          </div>
          <div className="other-news">
            {articles.slice(1).map((article) => (
              <div
                key={article.id}
                className="news-item"
                onClick={() => handleArticleClick(article.id)}
              >
                <img
                  src={article.image || "/src/assets/images.png"}
                  alt={article.title}
                  className="news-item-image"
                  onError={(e) => (e.target.src = "/src/assets/images.png")}
                />
                <div className="news-item-info">
                  <p className="news-item-date">
                    🕘 {new Date(article.date).toLocaleDateString()}
                  </p>
                  <p className="news-item-category">{article.category.title}</p>
                </div>
                <h3 className="news-item-title">{article.title}</h3>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="no-news">No news available</p>
      )}
    </div>
  );
}

export default SpecificCategory;
