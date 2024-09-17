import React, { useState, useEffect } from "react";
import { getArticlesByCategory } from "../api";

function SpecificCategory({ activeCategory }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getArticlesByCategory(activeCategory);
        console.log(response.data);
        setArticles(response.data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [activeCategory]);

  const filteredArticles = articles.filter(
    (article) => article.category.id === activeCategory
  );

  return (
    <div className="specific-category-page">
      <h1>{activeCategory}</h1>
      {filteredArticles.length > 0 ? (
        <>
          <div className="main-news">
            <div className="main-news-info">
              <p className="snews-date">
                🕘 {new Date(filteredArticles[0].date).toLocaleTimeString()}
              </p>
              <p className="snews-category">
                {filteredArticles[0].category.title}
              </p>
            </div>
            <img
              src={filteredArticles[0].image || "/src/assets/images.png"}
              alt={filteredArticles[0].title}
              className="main-news-image"
              onError={(e) => (e.target.src = "/src/assets/images.png")}
            />
            <h2 className="main-news-title">{filteredArticles[0].title}</h2>
          </div>
          <div className="other-news">
            {filteredArticles.slice(1).map((article) => (
              <div key={article.id} className="news-item">
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
