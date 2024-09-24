import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//useSelector btkhallini a3mol access 3al state mn l store
//useDispatch btkhallini eb3at actions to the Redux Store to modify the state
import { useNavigate } from "react-router-dom";
import { getLatestNews } from "../api";
import { setLatestNews, setStatus, setError } from "../reducers/newsReducer"; //used to update the Redux store

function LatestNews() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const latestNews = useSelector((state) => state.news.latestNews); //array of latest news
  const status = useSelector((state) => state.news.status);
  const error = useSelector((state) => state.news.error);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (pageNum === 1 && latestNews.length === 0) {
      //eza nhna b awal page w ma 3na news already loaded
      dispatch(setStatus("loading")); //to display the preloader
    }

    getLatestNews(pageNum) //fetch latest news for that specific page
      .then((response) => {
        const newNews = response.data.data;
        if (newNews.length === 0) {
          // No more news to load
          setHasMore(false);
        } else {
          dispatch(setLatestNews([...latestNews, ...newNews])); // Append new news aal 2dem
        }
        dispatch(setStatus("succeeded"));
      })
      .catch((err) => {
        dispatch(setError(err.message));
        dispatch(setStatus("failed"));
      });
  }, [dispatch, pageNum]);

  const handleClick = (id) => {
    navigate(`/news-details/${id}`);
  };

  const handleLoadMore = (event) => {
    event.preventDefault(); //cz kenet 3am ta3mol refresh lal page before showing new news
    setPageNum((prevPageNum) => prevPageNum + 1);
  };

  if (status === "loading") {
    return <p>Loading latest news...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="latest-list">
      {latestNews.map((latestItem, index) => (
        <div
          className="latest-item"
          key={`${latestItem.id}-${index}`}
          onClick={() => handleClick(latestItem.id)}
        >
          <img
            src={latestItem.image || "/src/assets/images.png"}
            alt={latestItem.title}
            onError={(e) => (e.target.src = "/src/assets/images.png")}
          />
          <div className="latest-details">
            <h2 className="latest-title">{latestItem.title}</h2>
            <div className="line">
              <p className="latest-date">{latestItem.date}</p>
              <h4 className="latest-category">{latestItem.category.title}</h4>
            </div>
          </div>
        </div>
      ))}

      {hasMore && (
        <div className="load-more-wrapper">
          <button className="load-more" type="button" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default LatestNews;
