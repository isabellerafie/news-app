import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../api";

function SingleNewsArticle() {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getSingleArticle(id)
      .then((response) => {
        setArticle(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching article details:", error);
      });
  }, [id]);

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="single-news-article">
      {article ? (
        <div className="article-details">
          <img
            src={article.image || "/src/assets/images.png"}
            alt={article.title}
            onError={(e) => (e.target.src = "/src/assets/images.png")}
          />
          <h1 className="article-title">{article.title}</h1>
          <p className="article-date">{article.date}</p>
          <div className="article-content">{article.content}</div>
        </div>
      ) : (
        <p>No article found</p>
      )}
    </div>
  );
}

export default SingleNewsArticle;
