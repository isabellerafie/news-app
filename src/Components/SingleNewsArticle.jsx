// src/components/SingleNewsArticle.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../api";

function SingleNewsArticle() {
  const { id } = useParams(); // Get the article ID from the URL parameters
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await getSingleArticle(id);
        setArticle(response.data.data); // Adjust this based on your API response structure
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  // Render nothing if article is null or undefined
  if (!article) {
    return null;
  }

  return (
    <div className="single-article-page">
      <img
        src={article.image || "/src/assets/images.png"}
        alt={article.title}
        className="single-article-image"
        onError={(e) => (e.target.src = "/src/assets/images.png")}
      />
      <h1 className="single-article-title">{article.title}</h1>
      <p className="single-article-date">
        {new Date(article.date).toLocaleDateString()}
      </p>
      <p className="single-article-category">{article.category.title}</p>
      <div className="single-article-content">
        {article.content} {/* Adjust based on your API response */}
      </div>
    </div>
  );
}

export default SingleNewsArticle;
