import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../api";

function SingleNewsArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [fontSize, setFontSize] = useState(16); // Default font size
  const [isLoading, setIsLoading] = useState(true); // Loading state

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
          <div className="loading-indicator">
            <p>Loading...</p>
          </div>
        </div>
      ) : article ? (
        <div className="article-details">
          <img
            src={article.image || "/src/assets/images.png"}
            alt={article.title}
            onError={(e) => (e.target.src = "/src/assets/images.png")}
          />
          <div className="article-info-row">
            <p className="article-date">{formatDate(article.date)}</p>
            <div className="article-icons">
              <i className="fa fa-share" onClick={handleShare}></i>
              <i className="fa fa-minus" onClick={decreaseFontSize}></i>
              <i className="fa fa-plus" onClick={increaseFontSize}></i>
            </div>
            <p className="category-label">{article.category.title}</p>
          </div>
          <hr />
          <h1 className="article-title">{article.title}</h1>
          <div
            className="article-content"
            style={{ fontSize: `${fontSize}px` }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      ) : (
        <p>No article found</p>
      )}
    </div>
  );
}

export default SingleNewsArticle;
