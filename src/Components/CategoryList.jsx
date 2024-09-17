import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, getArticlesByCategory } from "../api";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState({});
  const [error, setError] = useState(null);
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
      }
    };

    fetchCategoriesAndArticles();
  }, []);

  const handleClick = (id) => {
    navigate(`/news-details/${id}`); // Navigate to Single News Article Page
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <div key={category.id} className="category">
          <h2 className="category-name">{category.title}</h2>
          <div className="news-items">
            {articles[category.id]?.map((item) => (
              <div
                key={item.id}
                className="news-item"
                onClick={() => handleClick(item.id)}
              >
                <img
                  src={item.image || "/src/assets/images.png"}
                  alt={item.title}
                  className="news-image"
                />
                <div className="news-info">
                  <span className="news-date">
                    🕘 {new Date(item.date).toLocaleDateString()}
                  </span>
                  <span className="name">{category.title}</span>
                </div>
                <p className="news-title">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
